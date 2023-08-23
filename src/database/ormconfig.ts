import { DataSourceOptions } from 'typeorm';

const config: DataSourceOptions = {
  type: 'postgres',
  url: 'postgresql://postgres:oNPKySx0C4idz5TXrDtn@containers-us-west-86.railway.app:7802/railway',
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: ['./entities/*.entity.{ts,js}'],
};

export default config;
