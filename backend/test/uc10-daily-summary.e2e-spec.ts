import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UC-10: View Daily Summary (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    // 1. Tạo user giả lập và lấy token
    const testEmail = `test_uc10_${Date.now()}@gmail.com`;
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

  describe('FR_10.1: Lấy mục tiêu dinh dưỡng từ database', () => {
    it('TC_BB_10.1.2 - Lấy mục tiêu với ngày không có dữ liệu -> Trả về target mặc định', async () => {
      // User vừa tạo chưa set mục tiêu nào
      const res = await request(app.getHttpServer())
        .get('/api/meals/daily-summary?date=2025-01-01')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.targets).toBeDefined();
      // Target mặc định trong hệ thống
      expect(res.body.targets.calories).toBe(2000);
      expect(res.body.targets.protein).toBe(150);
      expect(res.body.targets.carbs).toBe(250);
      expect(res.body.targets.fats).toBe(65);
    });

    it('TC_BB_10.1.1 - Lấy đúng mục tiêu khi đã thiết lập', async () => {
      // Thiết lập mục tiêu mới
      const newTargets = {
        calories: 1800,
        protein: 120,
        carbs: 200,
        fats: 50,
      };

      // Gọi API cập nhật mục tiêu của User
      // Chờ API trả về 200 OK rồi mới lấy lại Summary để check
      await request(app.getHttpServer())
        .put('/api/users/targets')
        .set('Authorization', `Bearer ${token}`)
        .send(newTargets)
        .expect(200);

      // Fetch lại summary
      const res = await request(app.getHttpServer())
        .get('/api/meals/daily-summary')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.targets).toBeDefined();
      expect(res.body.targets.calories).toBe(1800);
      expect(res.body.targets.protein).toBe(120);
      expect(res.body.targets.carbs).toBe(200);
      expect(res.body.targets.fats).toBe(50);
    });
  });

  describe('FR_10.2: Tính tổng tiêu thụ và lượng còn lại', () => {
    beforeAll(async () => {
      // Đảm bảo target được set 1 con số dễ tính
      await request(app.getHttpServer())
        .put('/api/users/targets')
        .set('Authorization', `Bearer ${token}`)
        .send({
          calories: 2000,
          protein: 100,
          carbs: 200,
          fats: 50,
        });
    });

    it('TC_BB_10.2.1 - Tính consumed = tổng macros & remaining = target - consumed (consumed < target)', async () => {
      // Ghi bữa ăn 1
      await request(app.getHttpServer())
        .post('/api/meals/log')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Bữa sáng',
          foodItems: ['Bún', 'Thịt'],
          calories: 500, protein: 30, carbs: 50, fats: 10,
        });

      // Ghi bữa ăn 2
      await request(app.getHttpServer())
        .post('/api/meals/log')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Bữa trưa',
          foodItems: ['Thịt', 'Rau'],
          calories: 1000, protein: 50, carbs: 100, fats: 20,
        });

      // Fetch summary
      const res = await request(app.getHttpServer())
        .get('/api/meals/daily-summary')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      
      // TC_BB_10.2.1: Consumed = tổng của các bữa (500+1000=1500)
      expect(res.body.consumed.calories).toBe(1500);
      expect(res.body.consumed.protein).toBe(80);
      expect(res.body.consumed.carbs).toBe(150);
      expect(res.body.consumed.fats).toBe(30);

      // TC_BB_10.2.1: Remaining = Target - Consumed (2000 - 1500 = 500)
      expect(res.body.remaining.calories).toBe(500);
      expect(res.body.remaining.protein).toBe(20);
      expect(res.body.remaining.carbs).toBe(50);
      expect(res.body.remaining.fats).toBe(20);
    });

    it('TC_BB_10.2.3 - remaining không âm khi consumed > target', async () => {
      // Ghi bữa ăn 3 siêu bự để vượt quá mục tiêu
      await request(app.getHttpServer())
        .post('/api/meals/log')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Bữa tối nướng',
          foodItems: ['Thịt nướng'],
          calories: 1000, protein: 50, carbs: 100, fats: 50,
        });

      // Lúc này tổng consumed = 1500 + 1000 = 2500 (Vượt target 2000)
      const res = await request(app.getHttpServer())
        .get('/api/meals/daily-summary')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.consumed.calories).toBe(2500);
      
      // Khẳng định Remaining bị ép về 0 (không bị âm)
      expect(res.body.remaining.calories).toBe(0);
      expect(res.body.remaining.protein).toBe(0);
      expect(res.body.remaining.carbs).toBe(0);
      expect(res.body.remaining.fats).toBe(0);
    });
  });
});
