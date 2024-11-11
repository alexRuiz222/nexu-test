import { BrandEntity } from '../modules/brands/entities/brand.entity';
import { setSeederFactory } from 'typeorm-extension';

export const BrandFactory = setSeederFactory(BrandEntity, (brand: any) => {
  const newBrand = new BrandEntity();
  newBrand.name = brand.brand_name;
  return newBrand;
});
