import { Test, TestingModule } from '@nestjs/testing';
import { ModelsService } from './models.service';
import { ModelEntity } from '../entities/model.entity';
import { BrandEntity } from '../../brands/entities/brand.entity';

describe('ModelsService', () => {
  let service: ModelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BrandEntity, ModelEntity],
      providers: [ModelsService],
    }).compile();

    service = module.get<ModelsService>(ModelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
