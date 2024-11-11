import { Test, TestingModule } from '@nestjs/testing';
import { ModelsService } from './models.service';
import { ModelEntity } from '../entities/model.entity';
import { BrandEntity } from '../../brands/entities/brand.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('ModelsService', () => {
  let service: ModelsService;
  let modelRepository: Repository<ModelEntity>;

  const mockModelRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockBrandRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ModelsService,
        {
          provide: getRepositoryToken(ModelEntity),
          useValue: mockModelRepository,
        },
        {
          provide: getRepositoryToken(BrandEntity),
          useValue: mockBrandRepository,
        },
      ],
    }).compile();

    service = module.get<ModelsService>(ModelsService);
    modelRepository = module.get<Repository<ModelEntity>>(
      getRepositoryToken(ModelEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
