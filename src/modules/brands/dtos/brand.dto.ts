import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ModelDto } from 'src/modules/models/dtos/model.dto';

export class BrandDto {
  @IsNumber()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  name: string;

  @IsNumber()
  @Expose()
  average_price: number;

  @IsOptional()
  @Expose()
  models?: ModelDto[];
}
