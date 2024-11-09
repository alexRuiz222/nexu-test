import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UpdateModelDto {
  @IsNotEmpty()
  @IsNumber({}, { message: 'average_price must be a number' })
  @Min(100000, { message: 'average_price must be at least 100000' })
  average_price: number;
}
