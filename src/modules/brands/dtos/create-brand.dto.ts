import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;
}
