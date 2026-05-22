import { IsNumber, Min, Max } from 'class-validator';

export class CreateWeightLogDto {
  @IsNumber()
  @Min(20, { message: 'Cân nặng phải lớn hơn 20kg' })
  @Max(300, { message: 'Cân nặng vượt giới hạn cho phép' })
  weight: number;
}
