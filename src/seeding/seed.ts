import { pgConfig } from '../database/database.config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { BrandFactory } from './brand.factory';
import { ModelFactory } from './model.factory';
import { MainSeeder } from './main.seeder';
import { BrandEntity } from '../modules/brands/entities/brand.entity';
import { ModelEntity } from '../modules/models/entities/model.entity';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  ...pgConfig,
  factories: [BrandFactory, ModelFactory],
  seeds: [MainSeeder],
  entities: [BrandEntity, ModelEntity], // Direct entity references
};
console.log('Seeding started...');

const dataSource = new DataSource(options);
dataSource.initialize().then(async () => {
  // Clear tables in correct order due to foreign key constraints
  await dataSource.getRepository(ModelEntity).clear(); // Clear child table first
  // Clear all tables with CASCADE
  await dataSource.query('TRUNCATE TABLE brand_entity CASCADE');

  // Continue with your existing seeding process
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});
