import { Test, TestingModule } from '@nestjs/testing';
import { MealsService } from './meals.service';
import { PrismaService } from '../prisma/prisma.service';
import { TargetPeriodsService } from '../target-periods/target-periods.service';
import { CreateMealDto } from './dto/create-meal.dto';

describe('MealsService (White-box: calculateHealthScore)', () => {
  let service: MealsService;

  beforeEach(async () => {
    // Mock dependencies
    const mockPrismaService = {};
    const mockTargetPeriodsService = {};

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MealsService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: TargetPeriodsService, useValue: mockTargetPeriodsService },
      ],
    }).compile();

    service = module.get<MealsService>(MealsService);
  });

  describe('FR_9.2: calculateHealthScore', () => {
    // Sử dụng ép kiểu để gọi hàm private
    const calcScore = (dto: Partial<CreateMealDto>): number => {
      return (service as any).calculateHealthScore(dto as CreateMealDto);
    };

    it('TC_WB_9.2.1: Nhánh Return Sớm - Trả về ngay healthScore có sẵn', () => {
      // Branch 1: meal.healthScore !== undefined
      const score = calcScore({ healthScore: 7.4 });
      expect(score).toBe(7); // Làm tròn 7.4 -> 7
    });

    it('TC_WB_9.2.2: Nhánh Protein Cao và Fat Tốt -> Điểm cao', () => {
      // Nhánh: proteinRatio > 0.25 (120/400 = 0.3) -> +1.5
      // Nhánh: fatRatio >= 0.20 && fatRatio <= 0.35 (108/400 = 0.27) -> +1
      // Nhánh: calories không < 300, không > 1000 -> +0
      // Base: 5. Tổng: 5 + 1.5 + 1 = 7.5 -> Làm tròn thành 8
      const dto = {
        calories: 400,
        protein: 30, // 30 * 4 = 120 cal
        fats: 12,    // 12 * 9 = 108 cal
        carbs: 43    // Phần còn lại
      };
      const score = calcScore(dto);
      expect(score).toBe(8);
    });

    it('TC_WB_9.2.3: Nhánh Protein Khá (Vừa phải)', () => {
      // Nhánh: proteinRatio > 0.15 && <= 0.25 (80/400 = 0.2) -> +0.5
      // Nhánh Fat bình thường (nếu không lọt vào các nhánh khác)
      const dto = {
        calories: 400,
        protein: 20, // 20 * 4 = 80 cal (20%)
        fats: 5,     // 5 * 9 = 45 cal (11% -> Không vào nhánh fat tốt hay xấu)
        carbs: 68
      };
      // Base: 5 + 0.5 (protein) = 5.5 -> Làm tròn 6
      const score = calcScore(dto);
      expect(score).toBe(6);
    });

    it('TC_WB_9.2.4: Nhánh Phạt Nặng (Nhiều Fat, Nhiều Calories)', () => {
      // Nhánh: fatRatio > 0.50 (630/1100 = 0.57) -> -1
      // Nhánh: calories > 1000 -> -0.5
      // Nhánh Protein kém (<0.15) -> 0
      // Base: 5 - 1 - 0.5 = 3.5 -> Làm tròn thành 4
      const dto = {
        calories: 1100,
        protein: 20, // 80 cal
        fats: 70,    // 630 cal
        carbs: 97
      };
      const score = calcScore(dto);
      expect(score).toBe(4);
    });

    it('TC_WB_9.2.5: Nhánh Bữa ăn nhẹ (Ít Calories)', () => {
      // Nhánh: calories < 300 -> +0.5
      const dto = {
        calories: 200,
        protein: 5,  // 20 cal
        fats: 2,     // 18 cal
        carbs: 40
      };
      // Base: 5 + 0.5 (calo) = 5.5 -> Làm tròn 6
      const score = calcScore(dto);
      expect(score).toBe(6);
    });

    it('TC_WB_9.2.6: Nhánh Ép Biên Trên (Vượt quá 10)', () => {
      // Cố tình làm bữa ăn cực hoàn hảo và ít calo
      // Protein > 0.25 -> +1.5
      // Fat 0.20-0.35 -> +1
      // Calories < 300 -> +0.5
      // Base: 5 + 1.5 + 1 + 0.5 = 8 (Chưa quá 10, nhưng test truyền thẳng 15)
      // Để test ép biên, truyền healthScore: 15
      const score = calcScore({ healthScore: 15 });
      expect(score).toBe(10);
    });

    it('TC_WB_9.2.7: Nhánh Ép Biên Dưới (Nhỏ hơn 1)', () => {
      const score = calcScore({ healthScore: -3.5 });
      expect(score).toBe(1);
    });
  });
});
