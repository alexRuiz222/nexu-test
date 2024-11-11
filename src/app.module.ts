import { Module } from '@nestjs/common';
import { BrandsModule } from './modules/brands/brands.module';
import { ModelsModule } from './modules/models/models.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { pgConfig } from './database/database.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(pgConfig),
    BrandsModule,
    ModelsModule,
  ],
})
export class AppModule {}
