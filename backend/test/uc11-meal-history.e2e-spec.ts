import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma/prisma.service';

describe('UC-11: View Meal History (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let token: string;
  let userId: string;
  let profileId: string;
  let userCreatedDate: Date;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
    );
    prisma = app.get(PrismaService);
    await app.init();

    // 1. Tạo user giả lập và lấy token
    const testEmail = `test_uc11_${Date.now()}@gmail.com`;
    const resReg = await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({ email: testEmail, password: 'password123' })
      .expect(201);

    userId = resReg.body.user.id;

    const loginRes = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: testEmail, password: 'password123' })
      .expect(201);
    token = loginRes.body.accessToken;

    // Lấy profileId và ngày tạo của User
    const userRec = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });
    profileId = userRec!.profile!.id;
    userCreatedDate = userRec!.createdAt;

    // 2. Setup dữ liệu các bữa ăn vào thẳng DB (vì API log mặc định lấy giờ hiện tại)
    // Ngày 1: Hôm nay
    const today = new Date();
    // Ngày 2: Hôm qua
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    // Ngày 3: 2 ngày trước
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    await prisma.meal.createMany({
      data: [
        {
          profileId,
          name: 'Bữa hôm nay',
          calories: 500,
          protein: 30,
          carbs: 40,
          fats: 10,
          date: today,
          foodItems: ['Cơm'],
        },
        {
          profileId,
          name: 'Bữa hôm qua 1',
          calories: 600,
          protein: 40,
          carbs: 50,
          fats: 15,
          date: yesterday,
          foodItems: ['Bún'],
        },
        {
          profileId,
          name: 'Bữa hôm qua 2',
          calories: 400,
          protein: 20,
          carbs: 30,
          fats: 5,
          date: yesterday,
          foodItems: ['Phở'],
        },
        {
          profileId,
          name: 'Bữa 2 ngày trước',
          calories: 800,
          protein: 50,
          carbs: 60,
          fats: 20,
          date: twoDaysAgo,
          foodItems: ['Bò bít tết'],
        },
      ],
    });
  });

  afterAll(async () => {
    // Dọn dẹp data test
    await prisma.meal.deleteMany({ where: { profileId } });
    await prisma.profile.delete({ where: { userId } });
    await prisma.user.delete({ where: { id: userId } });
    await app.close();
  });

  describe('FR_11.1: Định dạng ngày tháng', () => {
    it('TC_BB_11.1.1 - startDate và endDate đúng định dạng YYYY-MM-DD -> 200 OK', async () => {
      const todayStr = new Date().toISOString().split('T')[0];
      const res = await request(app.getHttpServer())
        .get(`/api/meals/history?startDate=2024-01-01&endDate=${todayStr}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('TC_BB_11.1.2 - Định dạng ngày sai -> Báo lỗi 400', async () => {
      const res = await request(app.getHttpServer())
        .get(`/api/meals/history?startDate=01/01/2024&endDate=31-01-2024`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(400);
      expect(res.body.message).toEqual(
        expect.arrayContaining([
          'startDate must be in YYYY-MM-DD format',
          'endDate must be in YYYY-MM-DD format',
        ]),
      );
    });
  });

  describe('FR_11.2: Điều chỉnh ngày bắt đầu', () => {
    it('TC_BB_11.2.1 - startDate < ngày tạo tài khoản -> Tự động ép về ngày tạo tài khoản', async () => {
      // Vì User vừa được tạo hôm nay, userCreatedDate = today
      // Truyền startDate = "2020-01-01"
      const todayStr = new Date().toISOString().split('T')[0];

      const res = await request(app.getHttpServer())
        .get(`/api/meals/history?startDate=2020-01-01&endDate=${todayStr}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      // Kết quả chỉ trả về các ngày từ userCreatedDate trở đi
      // Nên bữa ăn của 2 ngày trước (nếu trước ngày tạo tk) sẽ không được lấy (nếu có tồn tại trong DB từ trước).
      // Trong test này, các bữa ăn "hôm qua" đều xảy ra TRƯỚC ngày tạo tài khoản (vì tài khoản tạo hôm nay).
      // Do đó, thuật toán finalStart = start > creationStart ? start : creationStart sẽ làm cho nó CHỈ lấy từ hôm nay!

      // Khẳng định: Mảng kết quả chỉ chứa ngày hôm nay
      expect(res.body.length).toBe(1);
      expect(res.body[0].date).toBe(todayStr);
    });
  });

  describe('FR_11.3: Lấy, nhóm bữa ăn và tính tổng', () => {
    it('TC_BB_11.3.1 - Nhóm đúng và tính tổng chuẩn xác', async () => {
      // Để test được việc nhóm hôm qua và 2 ngày trước, ta phải SỬA LẠI userCreatedDate lùi về quá khứ
      // Dùng Prisma ép ngày tạo tài khoản về 1 tuần trước
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      await prisma.user.update({
        where: { id: userId },
        data: { createdAt: oneWeekAgo },
      });

      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];
      const twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      const startStr = twoDaysAgo.toISOString().split('T')[0];

      const res = await request(app.getHttpServer())
        .get(`/api/meals/history?startDate=${startStr}&endDate=${todayStr}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(3); // 3 ngày có dữ liệu

      // Kiểm tra ngày hôm qua (chứa 2 bữa ăn)
      const yesterdayStr = new Date(today.getTime() - 86400000)
        .toISOString()
        .split('T')[0];
      const yesterdaySummary = res.body.find(
        (s: any) => s.date === yesterdayStr,
      );

      expect(yesterdaySummary.meals.length).toBe(2);
      // Tổng calories của ngày hôm qua = 600 + 400 = 1000
      expect(yesterdaySummary.consumed.calories).toBe(1000);
      // Tổng protein = 40 + 20 = 60
      expect(yesterdaySummary.consumed.protein).toBe(60);
    });

    it('TC_BB_11.3.2 - Kiểm tra khi không có bữa ăn trong khoảng thời gian -> Trả về mảng rỗng', async () => {
      // Dùng một khoảng thời gian tương lai để đảm bảo không có bữa ăn nào
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      const futureStr = futureDate.toISOString().split('T')[0];

      const res = await request(app.getHttpServer())
        .get(`/api/meals/history?startDate=${futureStr}&endDate=${futureStr}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBe(0);
    });

    it('TC_BB_11.3.3 - startDate > endDate -> Báo lỗi', async () => {
      const res = await request(app.getHttpServer())
        .get(`/api/meals/history?startDate=2024-01-31&endDate=2024-01-01`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Ngày bắt đầu phải nhỏ hơn ngày kết thúc');
    });
  });

  describe('FR_11.4: Sắp xếp kết quả', () => {
    it('TC_BB_11.4.1 - Sắp xếp từ ngày mới nhất đến ngày cũ nhất (giảm dần)', async () => {
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];
      const twoDaysAgoStr = new Date(today.getTime() - 86400000 * 2)
        .toISOString()
        .split('T')[0];

      const res = await request(app.getHttpServer())
        .get(
          `/api/meals/history?startDate=${twoDaysAgoStr}&endDate=${todayStr}`,
        )
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(1);

      // Khẳng định ngày ở index 0 phải lớn hơn ngày ở index 1 (chuỗi YYYY-MM-DD so sánh được)
      const date0 = res.body[0].date;
      const date1 = res.body[1].date;
      expect(date0 > date1).toBeTruthy(); // e.g. '2024-05-22' > '2024-05-21'
    });
  });
});
