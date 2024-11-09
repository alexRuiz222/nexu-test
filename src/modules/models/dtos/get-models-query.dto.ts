import { IsOptional } from 'class-validator';

export class GetModelsQueryDto {
  @IsOptional()
  //   @IsNumber({}, { message: 'greater must be a number' })
  //   @IsPositive({
  //     message: 'greater must be a positive number',
  //   })
  greater?: number;

  @IsOptional()
  //   @IsNumber({}, { message: 'lower must be a number' })
  //   @IsPositive({
  //     message: 'lower must be a positive number',
  //   })
  lower?: number;
}
