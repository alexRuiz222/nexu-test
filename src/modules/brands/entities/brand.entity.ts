import { ModelEntity } from '../../models/entities/model.entity';
import {
  AfterLoad,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class BrandEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column({ default: 0 })
  average_price: number;

  @OneToMany(() => ModelEntity, (model) => model.brand, { nullable: false })
  models: ModelEntity[];

  // calculate the average price of the brand's models after loading all models
  @AfterLoad()
  calculateAveragePrice() {
    if (this.models && this.models.length > 0) {
      this.average_price =
        this.models.reduce((acc, model) => acc + model.average_price, 0) /
        this.models.length;
    }
  }
}
