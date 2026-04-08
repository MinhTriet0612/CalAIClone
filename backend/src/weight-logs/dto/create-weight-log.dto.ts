import { IsNumber, IsPositive } from 'class-validator';

export class CreateWeightLogDto {
  @IsNumber()
  @IsPositive()
  weight: number;
}
