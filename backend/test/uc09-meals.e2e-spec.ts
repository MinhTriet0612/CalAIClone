import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UC-09: Record Food Intake (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Phải thêm ValidationPipe để kích hoạt class-validator trong môi trường test
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    // 1. Tạo user giả lập và lấy token
    const testEmail = `test_uc09_${Date.now()}@gmail.com`;
    await request(app.getHttpServer())
      .post('/api/auth/register')
      .send({ email: testEmail, password: 'password123' })
      .expect(201);

    const loginRes = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: testEmail, password: 'password123' })
      .expect(201);
      
    token = loginRes.body.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  const getBaseMeal = () => ({
    name: 'Cơm trưa',
    foodItems: ['Cơm', 'Thịt'],
    calories: 500,
    protein: 20,
    carbs: 50,
    fats: 10,
  });

  describe('FR_9.1 Validate Dữ Liệu', () => {
    it('TC_BB_9.1.1 - Kiểm tra validate khi tên bữa ăn rỗng -> Báo lỗi', async () => {
    const payload = getBaseMeal();
    payload.name = ''; // Tên rỗng

    const res = await request(app.getHttpServer())
      .post('/api/meals/log')
      .set('Authorization', `Bearer ${token}`)
      .send(payload);

    expect(res.status).toBe(400);
    // Báo cáo yêu cầu thông báo lỗi liên quan đến "Invalid meal data" hoặc lỗi validation
    expect(res.body.message).toEqual(expect.arrayContaining([expect.stringMatching(/name should not be empty|name must be/i)]));
  });

  it('TC_BB_9.1.2 - Kiểm tra validate khi calories âm -> Báo lỗi', async () => {
    const payload = getBaseMeal();
    payload.calories = -100; // Calories âm

    const res = await request(app.getHttpServer())
      .post('/api/meals/log')
      .set('Authorization', `Bearer ${token}`)
      .send(payload);

    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(expect.arrayContaining([expect.stringContaining('calories must not be less than 0')]));
  });

  it('TC_BB_9.1.3 - Kiểm tra validate khi protein âm -> Báo lỗi', async () => {
    const payload = getBaseMeal();
    payload.protein = -5; // Protein âm

    const res = await request(app.getHttpServer())
      .post('/api/meals/log')
      .set('Authorization', `Bearer ${token}`)
      .send(payload);

    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(expect.arrayContaining([expect.stringContaining('protein must not be less than 0')]));
  });

  it('TC_BB_9.1.4 - Kiểm tra validate khi carbs âm -> Báo lỗi', async () => {
    const payload = getBaseMeal();
    payload.carbs = -10; // Carbs âm

    const res = await request(app.getHttpServer())
      .post('/api/meals/log')
      .set('Authorization', `Bearer ${token}`)
      .send(payload);

    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(expect.arrayContaining([expect.stringContaining('carbs must not be less than 0')]));
  });

  it('TC_BB_9.1.5 - Kiểm tra validate khi fats âm -> Báo lỗi', async () => {
    const payload = getBaseMeal();
    payload.fats = -3; // Fats âm

    const res = await request(app.getHttpServer())
      .post('/api/meals/log')
      .set('Authorization', `Bearer ${token}`)
      .send(payload);

    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(expect.arrayContaining([expect.stringContaining('fats must not be less than 0')]));
  });

  it('TC_BB_9.1.6 - Kiểm tra dữ liệu hợp lệ -> Lưu thành công', async () => {
    const payload = {
      ...getBaseMeal(),
      healthScore: 8
    };

    const res = await request(app.getHttpServer())
      .post('/api/meals/log')
      .set('Authorization', `Bearer ${token}`)
      .send(payload);

    // Mong đợi HTTP 201 Created (NestJS default cho POST)
    expect(res.status).toBe(201);
    
    // Đảm bảo bữa ăn đã được lưu và trả về trong mảng meals
    expect(res.body.meals).toBeDefined();
    const savedMeal = res.body.meals.find((m: any) => m.name === 'Cơm trưa');
    expect(savedMeal).toBeDefined();
    expect(savedMeal.calories).toBe(500);
    expect(savedMeal.healthScore).toBe(8);
  });
  }); // End FR_9.1

  describe('FR_9.2 Gán và xử lý Health Score', () => {
    it('TC_BB_9.2.1 - Tự động tính health score khi chưa được cung cấp', async () => {
      const payload = getBaseMeal();
      // Không truyền healthScore
      
      const res = await request(app.getHttpServer())
        .post('/api/meals/log')
        .set('Authorization', `Bearer ${token}`)
        .send(payload);

      expect(res.status).toBe(201);
      const savedMeal = res.body.meals.find((m: any) => m.name === 'Cơm trưa');
      // Đảm bảo hệ thống tự gán 1 con số nguyên từ 1 đến 10
      expect(savedMeal.healthScore).toBeGreaterThanOrEqual(1);
      expect(savedMeal.healthScore).toBeLessThanOrEqual(10);
      expect(Number.isInteger(savedMeal.healthScore)).toBe(true);
    });

    it('TC_BB_9.2.2 - Làm tròn healthScore được truyền vào', async () => {
      const payload1 = { ...getBaseMeal(), name: 'Bữa 1', healthScore: 7.4 };
      const payload2 = { ...getBaseMeal(), name: 'Bữa 2', healthScore: 7.6 };

      // Gửi bữa 1
      await request(app.getHttpServer())
        .post('/api/meals/log')
        .set('Authorization', `Bearer ${token}`)
        .send(payload1);

      // Gửi bữa 2
      const res2 = await request(app.getHttpServer())
        .post('/api/meals/log')
        .set('Authorization', `Bearer ${token}`)
        .send(payload2);

      const meal1 = res2.body.meals.find((m: any) => m.name === 'Bữa 1');
      const meal2 = res2.body.meals.find((m: any) => m.name === 'Bữa 2');

      expect(meal1.healthScore).toBe(7); // 7.4 làm tròn xuống
      expect(meal2.healthScore).toBe(8); // 7.6 làm tròn lên
    });

    it('TC_BB_9.2.3 - Ép healthScore vượt quá 10 về 10', async () => {
      const payload = { ...getBaseMeal(), name: 'Bữa 3', healthScore: 12 };

      const res = await request(app.getHttpServer())
        .post('/api/meals/log')
        .set('Authorization', `Bearer ${token}`)
        .send(payload);

      const savedMeal = res.body.meals.find((m: any) => m.name === 'Bữa 3');
      expect(savedMeal.healthScore).toBe(10);
    });

    it('TC_BB_9.2.4 - Ép healthScore dưới 1 về 1', async () => {
      const payload = { ...getBaseMeal(), name: 'Bữa 4', healthScore: -5.5 };

      const res = await request(app.getHttpServer())
        .post('/api/meals/log')
        .set('Authorization', `Bearer ${token}`)
        .send(payload);

      const savedMeal = res.body.meals.find((m: any) => m.name === 'Bữa 4');
      expect(savedMeal.healthScore).toBe(1);
    });
  });
});
