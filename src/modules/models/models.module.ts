import { Module } from '@nestjs/common';
import { ModelsService } from './services/models.service';
import { ModelsController } from './controllers/models.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelEntity } from './entities/model.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModelEntity])],
  providers: [ModelsService],
  controllers: [ModelsController],
  exports: [ModelsService],
})
export class ModelsModule {}
