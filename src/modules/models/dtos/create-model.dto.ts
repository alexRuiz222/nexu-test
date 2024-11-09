import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { BrandEntity } from 'src/modules/brands/entities/brand.entity';

export class CreateModelDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @IsOptional()
  @IsNumber({}, { message: 'average_price must be a number' })
  @Min(100000, { message: 'average_price must be at least 100000' })
  average_price: number;

  brand: BrandEntity;
}
