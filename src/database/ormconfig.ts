import { DataSourceOptions } from 'typeorm';

const env = process.env.NODE_ENV;

const configProd: DataSourceOptions = {
  type: 'postgres',
  url: 'postgresql://postgres:oNPKySx0C4idz5TXrDtn@containers-us-west-86.railway.app:7802/railway',
  logging: false,
  migrations: ['./migrations/*.js'],
  entities: ['./entities/*.entity.js'],
};

const configDev: DataSourceOptions = {
  type: 'postgres',
  url: 'postgresql://postgres:oNPKySx0C4idz5TXrDtn@containers-us-west-86.railway.app:7802/railway',
  logging: env !== 'production',
  ssl: {
    rejectUnauthorized: false,
  },
  migrations: ['./migrations/*.{js,ts}'],
  entities: ['./entities/*.entity.{js,ts}'],
};

export default env === 'production' ? configProd : configDev;
