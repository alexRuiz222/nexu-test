import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { config } from 'dotenv';
import { parse } from 'pg-connection-string';

config();

const databaseUrl = process.env.DATABASE_URL;
const connectionOptions = databaseUrl
  ? parse(databaseUrl)
  : {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    };

export const pgConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: connectionOptions.host,
  port: +connectionOptions.port,
  username: connectionOptions.user,
  password: connectionOptions.password,
  database: connectionOptions.database,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
