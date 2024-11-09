import { BrandEntity } from 'src/modules/brands/entities/brand.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ModelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column({ default: 0 })
  average_price: number;

  @ManyToOne(() => BrandEntity, (brand) => brand.models, { nullable: false })
  brand: BrandEntity;
}
