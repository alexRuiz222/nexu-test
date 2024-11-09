import { Test, TestingModule } from '@nestjs/testing';
import { BrandsController } from './brands.controller';
import { BrandsService } from '../services/brands.service';
import { BrandEntity } from '../entities/brand.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BrandsController', () => {
  let controller: BrandsController;
  let service: BrandsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandsController],
      providers: [
        BrandsService,
        { provide: getRepositoryToken(BrandEntity), useValue: BrandEntity },
      ],
    }).compile();

    controller = module.get<BrandsController>(BrandsController);
    service = module.get<BrandsService>(BrandsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should list all brands', async () => {
    const result: BrandEntity[] = [
      {
        id: 1,
        name: 'Acura',
        average_price: 702109,
        models: [],
        calculateAveragePrice: () => 702109,
      },
      {
        id: 2,
        name: 'Audi',
        average_price: 630759,
        models: [],
        calculateAveragePrice: () => 630759,
      },
    ];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);

    expect(await controller.getAll()).toBe(result);
  });
});
