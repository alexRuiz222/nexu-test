import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from '../entities/brand.entity';
import { Repository } from 'typeorm';
import { CreateBrandDto } from '../dtos/create-brand.dto';
import { plainToInstance } from 'class-transformer';
import { BrandDto } from '../dtos/brand.dto';
import { CreateModelDto } from 'src/modules/models/dtos/create-model.dto';
import { ModelEntity } from 'src/modules/models/entities/model.entity';
import { ModelDto } from 'src/modules/models/dtos/model.dto';
import { ModelsService } from 'src/modules/models/services/models.service';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(BrandEntity)
    private brandsRepository: Repository<BrandEntity>,
    private modelService: ModelsService,
  ) {}

  findAll(): Promise<BrandEntity[]> {
    return this.brandsRepository.find({ relations: ['models'] });
  }

  async findOne(id: number) {
    const brand = await this.brandsRepository.findOne({
      where: { id },
      relations: ['models'],
    });
    return brand;
  }

  async create(body: CreateBrandDto) {
    // check if brand already exists
    const brandExists = await this.brandsRepository.findOne({
      where: { name: body.name },
    });
    if (brandExists) {
      throw new ConflictException('Brand already exists');
    }
    // create new brand if not exists
    const newBrand = this.brandsRepository.create(body);
    return this.brandsRepository.save(newBrand);
  }

  async update(id: number, body: CreateBrandDto) {
    const brand = await this.brandsRepository.findOne({ where: { id } });

    this.brandsRepository.merge(brand, body);
    return this.brandsRepository.save(brand);
  }

  async delete(id: number) {
    await this.brandsRepository.delete({ id });
    return { message: 'Brand deleted successfully' };
  }

  async insertModel(brandId: number, createModelDto: CreateModelDto) {
    // Get brand
    const brand = await this.brandsRepository.findOne({
      where: { id: brandId },
      relations: ['models'],
    });

    try {
      // Create new models
      const model = new ModelEntity();
      model.name = createModelDto.name;
      model.average_price = createModelDto.average_price;
      model.brand = brand;

      const newModel = await this.modelService.create(model);

      //Check if model already exists in brand
      const modelExists = brand.models.find((m) => m.name === newModel.name);
      if (modelExists) {
        throw new ConflictException('Model already exists in brand');
      }
      // Add model to brand
      brand.models.push(newModel);
      const updatedBrand = await this.brandsRepository.save(brand);
      const brandDto = plainToInstance(BrandDto, updatedBrand, {
        excludeExtraneousValues: true,
      });
      // Transform models to a ModelDTO
      brandDto.models = updatedBrand.models.map((m) =>
        plainToInstance(ModelDto, m, { excludeExtraneousValues: true }),
      );
      return brandDto;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  getModelsByBrandId(brandId: number): Promise<ModelEntity[]> {
    return this.brandsRepository
      .findOne({
        where: { id: brandId },
        relations: ['models'],
      })
      .then((brand) => {
        if (!brand) {
          throw new NotFoundException('Brand not found');
        }
        return brand.models;
      });
  }
}
