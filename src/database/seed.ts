import { createConnection, getRepository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { BrandEntity } from 'src/modules/brands/entities/brand.entity';
import { ModelEntity } from 'src/modules/models/entities/model.entity';

async function seed() {
  // Leer el archivo data.json
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'data.json'), 'utf-8'),
  );

  // Crear conexión a la base de datos

  createConnection({
    type: 'postgres', // o el tipo de base de datos que estés utilizando
    host: process.env.DB_HOST, // usa tus variables de entorno
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
      /* tus entidades aquí */
    ],
    synchronize: true, // Si deseas sincronizar las entidades al ejecutar la aplicación
  })
    .then(async () => {
      console.log('Conexión exitosa');
      // Aquí puedes agregar el código para realizar las migraciones o insertar datos
    })
    .catch((error) => {
      console.error('Error durante la conexión a la base de datos', error);
    });
  // Obtener repositorios de las entidades
  const brandRepository = getRepository(BrandEntity);
  const modelRepository = getRepository(ModelEntity);

  for (const item of data) {
    // Verificar si la marca ya existe en la base de datos
    let brand = await brandRepository.findOne({
      where: { name: item.brand_name },
    });

    if (!brand) {
      // Si no existe, crear una nueva marca
      brand = brandRepository.create({
        name: item.brand_name,
        average_price: item.average_price,
      });
      await brandRepository.save(brand);
    }

    // Crear el modelo y asignarle la marca correspondiente
    const model = modelRepository.create({
      name: item.name,
      brand: brand, // Relacionar el modelo con la marca
    });

    await modelRepository.save(model);
  }

  console.log('Data migrated successfully!');
  // await connection.close();
}

seed().catch((error) => {
  console.error('Error during migration:', error);
});
