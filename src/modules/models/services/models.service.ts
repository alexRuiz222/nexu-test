import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModelEntity } from '../entities/model.entity';
import { Repository } from 'typeorm';
import { UpdateModelDto } from '../dtos/update-model.dto';

@Injectable()
export class ModelsService {
  constructor(
    @InjectRepository(ModelEntity)
    private modelRepository: Repository<ModelEntity>,
  ) {}

  findAll(greater?: number, lower?: number) {
    const queryBuilder = this.modelRepository.createQueryBuilder('model');
    if (greater) {
      queryBuilder.andWhere('model.average_price > :greater', { greater });
    }
    if (lower) {
      queryBuilder.andWhere('model.average_price < :lower', { lower });
    }
    return queryBuilder.getMany();
  }

  findOne(id: number) {
    return this.modelRepository.findOne({ where: { id } });
  }

  async create(model: ModelEntity) {
    //check if model already exists
    const existingModel = await this.modelRepository.findOne({
      where: { name: model.name },
    });
    if (existingModel) {
      return existingModel;
    }
    return await this.modelRepository.save(model);
  }

  async update(id: number, model: UpdateModelDto) {
    const modelToUpdate = await this.modelRepository.findOne({ where: { id } });
    this.modelRepository.merge(modelToUpdate, model);
    return await this.modelRepository.save(modelToUpdate);
  }
}
