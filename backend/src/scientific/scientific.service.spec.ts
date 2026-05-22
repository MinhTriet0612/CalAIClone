import { Test, TestingModule } from '@nestjs/testing';
import { ScientificService } from './scientific.service';

/**
 * File Test tuân thủ tuyệt đối chuẩn ISO/IEC 29119 (Test Documentation)
 * và nguyên tắc Clean Test Code (AAA, Idempotency, No Logic in Expect)
 */
describe('ScientificService (Unit Tests)', () => {
  let service: ScientificService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScientificService],
    }).compile();

    service = module.get<ScientificService>(ScientificService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers(); // Strict rule: always restore time
  });

  describe('FR_14.2: calculateEMA() - Tính toán đường xu hướng mượt', () => {
    it('TC_WB_14.2.1: Kiểm tra đường đi khi previousTrend = null', () => {
      // Arrange
      const actual = 70.0;
      const previousTrend = null;

      // Act
      const result = service.calculateEMA(actual, previousTrend);

      // Assert
      expect(result).toBe(70.0);
    });

    it('TC_WB_14.2.2: Kiểm tra logic tính toán công thức trung bình động', () => {
      // Arrange
      const actual = 69.0;
      const previousTrend = 70.0;
      const alpha = 0.1;

      // Act
      const result = service.calculateEMA(actual, previousTrend, alpha);

      // Assert
      expect(result).toBeCloseTo(69.9, 5);
    });
  });

  describe('FR_15.2: calculateAdaptiveTDEE() - Hiệu chỉnh TDEE thích ứng', () => {
    it('TC_WB_15.2.1: Kiểm tra phản hồi nhánh rẽ Exception ngầm khi days = 0', () => {
      // Arrange
      const avgIntake = 2000;
      const weightChange = -1.2;
      const days = 0;

      // Act
      const result = service.calculateAdaptiveTDEE(avgIntake, weightChange, days);

      // Assert
      expect(result).toBe(2000);
    });

    it('TC_WB_15.2.2: Kiểm thử điều hướng luồng tính toán chênh lệch khi Days > 0', () => {
      // Arrange
      const avgIntake = 2000;
      const weightChange = -1.0;
      const days = 14;

      // Act
      const result = service.calculateAdaptiveTDEE(avgIntake, weightChange, days);

      // Assert
      expect(result).toBe(2550);
    });
  });

  describe('FR_18.2: predictPlateau() - Dự đoán chững cân (Metabolic Plateau)', () => {
    it('TC_WB_18.2.1: Kiểm thử khi Calo nằm trong giới hạn an toàn (Chưa bão hòa)', () => {
      // Arrange
      const currentTDEE = 2500;
      const dailyIntake = 2000;
      // Deficit = 2500 - 2000 = 500 > 100

      // Act
      const result = service.predictPlateau(currentTDEE, dailyIntake);

      // Assert
      expect(result).toBe(false);
    });

    it('TC_WB_18.2.2: Kiểm thử khi thâm hụt calo quá nhỏ (Bão hòa)', () => {
      // Arrange
      const currentTDEE = 2500;
      const dailyIntake = 2450;
      // Deficit = 2500 - 2450 = 50 <= 100

      // Act
      const result = service.predictPlateau(currentTDEE, dailyIntake);

      // Assert
      expect(result).toBe(true);
    });
  });
});
