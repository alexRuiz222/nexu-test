import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class ModelDto {
  @IsNumber()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  name: string;

  @IsNumber()
  @Expose()
  average_price: number;
}
