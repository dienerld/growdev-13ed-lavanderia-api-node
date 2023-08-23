import { DataSourceOptions } from 'typeorm';
import { ApartmentEntity } from './entities/apartment.entity';
import { BookingsEntity } from './entities/bookings.entity';

const config: DataSourceOptions = {
  type: 'postgres',
  url: 'postgresql://postgres:oNPKySx0C4idz5TXrDtn@containers-us-west-86.railway.app:7802/railway',
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
  // entities: ['./entities/*.entity.{ts,js}'],
  entities: [ApartmentEntity, BookingsEntity],
};

export default config;
