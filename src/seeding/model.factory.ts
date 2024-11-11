import { ModelEntity } from '../modules/models/entities/model.entity';
import { setSeederFactory } from 'typeorm-extension';
export const ModelFactory = setSeederFactory(ModelEntity, (model: any) => {
  const newModel = new ModelEntity();
  newModel.name = model.name;
  newModel.average_price = model.average_price;
  newModel.id = model.id;

  return newModel;
});
