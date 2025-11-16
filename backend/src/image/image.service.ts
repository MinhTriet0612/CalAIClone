import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import FormData from 'form-data';

@Injectable()
export class ImageService {
  private readonly apiKey: string;
  private readonly uploadUrl: string = 'https://freeimage.host/api/1/upload';

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('FREEIMAGE_API_KEY') || '6d207e02198a847aa98d0a2a901485a5';
  }

  /**
   * Upload image to freeimage.host
   * @param imageBuffer - Image file buffer
   * @param filename - Original filename
   * @returns Image URL
   */
  async uploadImage(imageBuffer: Buffer, filename?: string): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('key', this.apiKey);
      formData.append('action', 'upload');
      formData.append('format', 'json');
      formData.append('source', imageBuffer, {
        filename: filename || 'meal-image.jpg',
        contentType: 'image/jpeg',
      });

      const response = await axios.post(this.uploadUrl, formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });

      if (response.data.status_code === 200 && response.data.image?.url) {
        return response.data.image.url;
      }

      throw new Error(response.data.error?.message || 'Failed to upload image');
    } catch (error: any) {
      console.error('Error uploading image to freeimage.host:', error);
      if (error.response?.data) {
        console.error('API Error Response:', error.response.data);
      }
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  }

  /**
   * Upload image from base64 string
   */
  async uploadImageFromBase64(base64String: string, filename?: string): Promise<string> {
    // Remove data URL prefix if present
    const base64Data = base64String.includes(',') 
      ? base64String.split(',')[1] 
      : base64String;
    
    const imageBuffer = Buffer.from(base64Data, 'base64');
    return this.uploadImage(imageBuffer, filename);
  }
}

