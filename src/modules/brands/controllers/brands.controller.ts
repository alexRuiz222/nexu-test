import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateBrandDto } from '../dtos/create-brand.dto';
import { BrandsService } from '../services/brands.service';
import { BrandDto } from '../dtos/brand.dto';
import { BrandExistsGuard } from '../brand-exists/brand-exists.guard';
import { CreateModelDto } from '../../models/dtos/create-model.dto';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}
  @Get() getAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  @UseGuards(BrandExistsGuard)
  getOne(@Param('id') id: number) {
    return this.brandsService.findOne(id);
  }

  @Get('/:id/models')
  @UseGuards(BrandExistsGuard)
  getBranchModels(@Param('id') id: number) {
    return this.brandsService.getModelsByBrandId(id);
  }

  @Post()
  createBrand(@Body() body: CreateBrandDto) {
    return this.brandsService.create(body);
  }

  @Post('/:id/models')
  @UseGuards(BrandExistsGuard)
  createModel(
    @Param('id') id: number,
    @Body() body: CreateModelDto,
  ): Promise<BrandDto> {
    return this.brandsService.insertModel(id, body);
  }

  @Put(':id')
  @UseGuards(BrandExistsGuard)
  updateBrand(@Param('id') id: number, @Body() body: any) {
    return this.brandsService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(BrandExistsGuard)
  delete(@Param('id') id: number) {
    return this.brandsService.delete(id);
  }
}
