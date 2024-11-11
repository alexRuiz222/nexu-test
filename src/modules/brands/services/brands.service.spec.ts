import { Test, TestingModule } from '@nestjs/testing';
import { BrandsService } from './brands.service';
import { BrandsModule } from '../brands.module';
import { ModelEntity } from '../../models/entities/model.entity';
import { ModelsService } from '../../models/services/models.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from '../entities/brand.entity';
import { pgConfig } from 'src/database/database.config';

describe('BrandsService', () => {
  let service: BrandsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          entities: [ModelEntity, BrandEntity],
          autoLoadEntities: true,
          synchronize: true,
          ...pgConfig,
        }),
        TypeOrmModule.forFeature([BrandEntity, ModelEntity]),
        BrandsModule,
      ],
      providers: [BrandsService, ModelsService],
    }).compile();

    service = module.get<BrandsService>(BrandsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
