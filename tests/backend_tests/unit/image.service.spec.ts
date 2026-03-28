import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { ImageService } from '../../../backend/src/image/image.service';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ImageService', () => {
  let service: ImageService;

  const mockConfigService = {
    get: jest.fn().mockReturnValue('test-api-key'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImageService,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<ImageService>(ImageService);
    jest.clearAllMocks();
  });

  describe('uploadImage', () => {
    it('should upload image and return URL', async () => {
      mockedAxios.post.mockResolvedValue({
        data: {
          status_code: 200,
          image: {
            url: 'https://freeimage.host/image/test123.jpg',
          },
        },
      });

      const buffer = Buffer.from('fake-image-data');
      const result = await service.uploadImage(buffer, 'test.jpg');

      expect(result).toBe('https://freeimage.host/image/test123.jpg');
      expect(mockedAxios.post).toHaveBeenCalled();
    });

    it('should throw error on failed upload', async () => {
      mockedAxios.post.mockResolvedValue({
        data: {
          status_code: 400,
          error: { message: 'Invalid image' },
        },
      });

      const buffer = Buffer.from('fake-image-data');

      await expect(service.uploadImage(buffer, 'test.jpg')).rejects.toThrow(
        'Invalid image',
      );
    });

    it('should throw error on network failure', async () => {
      mockedAxios.post.mockRejectedValue(new Error('Network error'));

      const buffer = Buffer.from('fake-image-data');

      await expect(service.uploadImage(buffer)).rejects.toThrow(
        'Failed to upload image',
      );
    });

    it('should use default filename when not provided', async () => {
      mockedAxios.post.mockResolvedValue({
        data: {
          status_code: 200,
          image: { url: 'https://freeimage.host/image/default.jpg' },
        },
      });

      const buffer = Buffer.from('fake-image-data');
      const result = await service.uploadImage(buffer);

      expect(result).toBe('https://freeimage.host/image/default.jpg');
    });
  });

  describe('uploadImageFromBase64', () => {
    it('should convert base64 and upload', async () => {
      mockedAxios.post.mockResolvedValue({
        data: {
          status_code: 200,
          image: { url: 'https://freeimage.host/image/b64.jpg' },
        },
      });

      const base64String = 'data:image/jpeg;base64,/9j/4AAQSkZJRg==';
      const result = await service.uploadImageFromBase64(base64String);

      expect(result).toBe('https://freeimage.host/image/b64.jpg');
    });

    it('should handle raw base64 without data URL prefix', async () => {
      mockedAxios.post.mockResolvedValue({
        data: {
          status_code: 200,
          image: { url: 'https://freeimage.host/image/raw.jpg' },
        },
      });

      const result = await service.uploadImageFromBase64('/9j/4AAQSkZJRg==');

      expect(result).toBe('https://freeimage.host/image/raw.jpg');
    });
  });
});
