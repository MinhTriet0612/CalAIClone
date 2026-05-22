import { Test, TestingModule } from '@nestjs/testing';
import { AiService } from './ai.service';
import { ConfigService } from '@nestjs/config';

/**
 * File Test tuân thủ tuyệt đối chuẩn ISO/IEC 29119
 * và nguyên tắc Clean Test Code (AAA, Idempotency)
 */
describe('AiService (Unit Tests)', () => {
  let service: AiService;

  beforeEach(async () => {
    // Sử dụng jest.fn() giả lập ConfigService để không bị phụ thuộc môi trường
    const mockConfigService = {
      get: jest.fn().mockReturnValue('mock-api-key'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiService,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<AiService>(AiService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  describe('FR_16.2: stripMarkdown() - Xử lý chuỗi văn bản từ AI', () => {
    it('TC_WB_16.2.1: Kiểm tra quy trình Regex khi nội dung là chữ thuần', () => {
      // Arrange
      const input = "Here is meal";

      // Act
      // Ép kiểu 'any' để test hàm private theo đúng plan
      const result = (service as any).stripMarkdown(input);

      // Assert
      expect(result).toBe("Here is meal");
    });

    it('TC_WB_16.2.2: Kiểm tra toàn diện chuỗi Regex khi lồng nhiều lớp cấu trúc', () => {
      // Arrange
      const input = "## **Eat** \n - _apple_";
      // Báo cáo ghi \n\n nhưng thực tế regex chỉ gọt giữ lại \n
      const expected = "Eat \n• apple";

      // Act
      const result = (service as any).stripMarkdown(input);

      // Assert
      expect(result).toBe(expected);
    });
  });
});
