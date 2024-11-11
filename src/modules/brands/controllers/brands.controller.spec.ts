import { Test, TestingModule } from '@nestjs/testing';
import { BrandsController } from './brands.controller';
import { BrandsService } from '../services/brands.service';
import { BrandEntity } from '../entities/brand.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ModelEntity } from '../../models/entities/model.entity';
import { ModelsService } from 'src/modules/models/services/models.service';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { CreateBrandDto } from '../dtos/create-brand.dto';
import { CreateModelDto } from 'src/modules/models/dtos/create-model.dto';
import { Repository } from 'typeorm';

describe('BrandsController', () => {
  let controller: BrandsController;
  let service: BrandsService;
  let brandsRepository: Repository<BrandEntity>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [BrandsController],
      providers: [
        BrandsService,
        ModelsService,
        {
          provide: getRepositoryToken(BrandEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(ModelEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
          },
        },
        // {
        //   provide: BrandsService,
        //   useValue: {
        //     findAll: jest.fn(),
        //     create: jest.fn(),
        //     insertModel: jest.fn().mockImplementation((id, dto) => {
        //       if (dto.average_price < 100000) {
        //         throw new BadRequestException(
        //           'average_price must be at least 100000',
        //         );
        //       }
        //       return Promise.resolve({ id, ...dto });
        //     }),
        //   },
        // },
      ],
    }).compile();

    brandsRepository = module.get(getRepositoryToken(BrandEntity));

    controller = module.get<BrandsController>(BrandsController);
    service = module.get<BrandsService>(BrandsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a brand', async () => {
    const mockBrand: BrandEntity = {
      id: 1,
      name: 'Toyota',
      models: [],
      average_price: 702109,
      calculateAveragePrice: () => 702109,
    };

    jest.spyOn(brandsRepository, 'create').mockReturnValue(mockBrand);
    jest.spyOn(brandsRepository, 'save').mockResolvedValue(mockBrand);
  });

  describe('BrandsController - Get All Brands', () => {
    // Setup común de datos de prueba
    const mockBrands: BrandEntity[] = [
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

    beforeEach(() => {
      // Configurar el mock antes de cada test
      jest.spyOn(service, 'findAll').mockResolvedValue(mockBrands);
    });

    afterEach(() => {
      // Limpiar los mocks después de cada test
      jest.clearAllMocks();
    });

    it('should call the service findAll method', async () => {
      await controller.getAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return an array of brands successfully', async () => {
      const response = await controller.getAll();
      expect(response).toBeDefined();
      expect(Array.isArray(response)).toBe(true);
      expect(response).toEqual(mockBrands);
    });

    it('should return brands with correct structure', async () => {
      const response = await controller.getAll();
      response.forEach((brand) => {
        expect(brand).toHaveProperty('id');
        expect(brand).toHaveProperty('name');
        expect(typeof brand.id).toBe('number');
        expect(typeof brand.name).toBe('string');
      });
    });

    it('should handle empty response', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);
      const response = await controller.getAll();
      expect(response).toEqual([]);
      expect(response.length).toBe(0);
    });

    it('should handle service errors', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockRejectedValue(new Error('Database error'));
      await expect(controller.getAll()).rejects.toThrow('Database error');
    });
  });

  describe('BrandsController -  Create Brand', () => {
    it('should throw ConflictException when brand already exists', async () => {
      // Arrange
      const createBrandDto: CreateBrandDto = { name: 'Audi' };
      jest
        .spyOn(service, 'create')
        .mockRejectedValue(new ConflictException('Brand already exists'));

      // Act & Assert
      await expect(controller.createBrand(createBrandDto)).rejects.toThrow(
        ConflictException,
      );

      expect(service.create).toHaveBeenCalledWith(createBrandDto);
    });
  });

  describe('BrandsController - Create Model in Brand', () => {
    it('should throw ConflictException when trying to add duplicate model to brand', async () => {
      const brand: BrandEntity = {
        id: 1,
        name: 'Acura',
        average_price: 702109,
        models: [],
        calculateAveragePrice: () => 702109,
      };
      const createModelDto: CreateModelDto = {
        name: 'ILX',
        average_price: 30000,
        brand,
      };

      jest
        .spyOn(service, 'insertModel')
        .mockRejectedValue(
          new ConflictException('Model already exists in brand'),
        );

      await expect(controller.createModel(1, createModelDto)).rejects.toThrow(
        ConflictException,
      );
    });

    // Opción 1: Usando expect().rejects.toThrow()
    it('should throw BadRequestException when average_price is less than 100000', async () => {
      const brand: BrandEntity = {
        id: 1,
        name: 'Acura',
        average_price: 702109,
        models: [],
        calculateAveragePrice: () => 702109,
      };

      const createModelDto: CreateModelDto = {
        name: 'Test Model',
        average_price: 50000,
        brand,
      };
      jest
        .spyOn(service, 'insertModel')
        .mockRejectedValue(
          new BadRequestException('average_price must be at least 100000'),
        );

      await expect(
        controller.createModel(brand.id, createModelDto),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('should create model when average_price is valid', async () => {
      const brand: BrandEntity = {
        id: 1,
        name: 'Acura',
        average_price: 702109,
        models: [],
        calculateAveragePrice: () => 702109,
      };

      const createModelDto: CreateModelDto = {
        name: 'Test Model',
        average_price: 150000, // Valid price
        brand,
      };
      const expectedResult = { ...createModelDto, id: 1 };

      jest.spyOn(service, 'insertModel').mockResolvedValue(expectedResult);

      const result = await controller.createModel(brand.id, createModelDto);

      expect(service.insertModel).toHaveBeenCalledWith(
        brand.id,
        createModelDto,
      );
      expect(result).toEqual(expectedResult);
    });
  });
});
