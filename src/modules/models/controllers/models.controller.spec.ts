import { Test, TestingModule } from '@nestjs/testing';
import { ModelsController } from './models.controller';
import { ModelEntity } from '../entities/model.entity';
import { ModelsService } from '../services/models.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ModelsController', () => {
  let controller: ModelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModelsController],
      providers: [
        ModelsService,
        {
          provide: getRepositoryToken(ModelEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ModelsController>(ModelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('ModelsController - Get All Models', () => {
    let controller: ModelsController;
    let service: ModelsService;

    beforeEach(() => {
      service = {
        findAll: jest.fn(),
      } as any;
      controller = new ModelsController(service);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call service.findAll with no filters when no query params are provided', async () => {
      await controller.getAll({});
      expect(service.findAll).toHaveBeenCalledWith(undefined, undefined);
    });

    it('should call service.findAll with correct greater value', async () => {
      await controller.getAll({ greater: 1000 });
      expect(service.findAll).toHaveBeenCalledWith(1000, undefined);
    });

    it('should call service.findAll with correct lower value', async () => {
      await controller.getAll({ lower: 500 });
      expect(service.findAll).toHaveBeenCalledWith(undefined, 500);
    });

    it('should call service.findAll with both greater and lower values', async () => {
      await controller.getAll({ greater: 1000, lower: 500 });
      expect(service.findAll).toHaveBeenCalledWith(1000, 500);
    });
  });
});
