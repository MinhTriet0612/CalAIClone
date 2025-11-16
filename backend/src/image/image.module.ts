import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}

