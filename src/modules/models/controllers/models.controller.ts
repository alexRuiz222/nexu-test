import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ModelsService } from '../services/models.service';
import { UpdateModelDto } from '../dtos/update-model.dto';
import { ModelExistsGuard } from '../model-exists/model-exists.guard';
import { GetModelsQueryDto } from '../dtos/get-models-query.dto';

@Controller('models')
@UsePipes(new ValidationPipe({ transform: true }))
export class ModelsController {
  constructor(private modelService: ModelsService) {}
  @Get()
  getAll(@Query() query: GetModelsQueryDto) {
    const { greater, lower } = query;
    if (greater && isNaN(Number(greater))) {
      throw new BadRequestException('greater must be a valid number');
    }
    if (lower && isNaN(Number(lower))) {
      throw new BadRequestException('lower must be a valid number');
    }

    return this.modelService.findAll(greater, lower);
  }

  @Put(':id')
  @UseGuards(ModelExistsGuard)
  updateModel(@Param('id') id: number, @Body() modelDto: UpdateModelDto) {
    return this.modelService.update(id, modelDto);
  }
}
