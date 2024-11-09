import { Module } from '@nestjs/common';
import { BrandsController } from './controllers/brands.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from './entities/brand.entity';
import { BrandsService } from './services/brands.service';
import { ModelEntity } from '../models/entities/model.entity';
import { ModelsService } from '../models/services/models.service';

@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity, ModelEntity])],
  providers: [BrandsService, ModelsService],
  controllers: [BrandsController],
  exports: [BrandsService],
})
export class BrandsModule {}
