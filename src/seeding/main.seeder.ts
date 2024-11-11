import { BrandEntity } from '../modules/brands/entities/brand.entity';
import { ModelEntity } from '../modules/models/entities/model.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import * as fs from 'fs';
import * as path from 'path';

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data.json'), 'utf-8'),
);

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    if (!Array.isArray(data)) {
      throw new Error('Data is not an array');
    }
    const brandsData = Array.from(
      new Set(data.map((brand) => brand.brand_name)),
    );

    const brandRepo = dataSource.getRepository(BrandEntity);
    console.log('Seeding brands');
    for (const brand of brandsData) {
      const brandEntity = await brandRepo.create({ name: brand });
      await brandRepo.save(brandEntity);

      const modelsData = data.filter((model) => model.brand_name === brand);
      const models = await Promise.all(
        modelsData.map(async (model) => {
          const modelEntity = await factoryManager.get(ModelEntity).make({
            name: model.name,
            average_price: model.average_price,
            brand: brandEntity,
          });
          return modelEntity;
        }),
      );
      await dataSource.getRepository(ModelEntity).save(models);
    }

    console.log('Seeding finished');
  }
}
