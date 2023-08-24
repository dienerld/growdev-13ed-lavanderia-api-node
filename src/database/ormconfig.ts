import { DataSourceOptions } from 'typeorm';
import { ApartmentEntity } from './entities/apartment.entity';
import { BookingsEntity } from './entities/bookings.entity';
import { ApartmentsMigration1692915591824 } from './migrations/1692915591824-ApartmentsMigration';
import { BookingsMigration1692916162938 } from './migrations/1692916162938-BookingsMigration';

const env = process.env.NODE_ENV;

const config: DataSourceOptions = {
  type: 'postgres',
  url: 'postgresql://postgres:oNPKySx0C4idz5TXrDtn@containers-us-west-86.railway.app:7802/railway',
  logging: env !== 'production',
  ssl: {
    rejectUnauthorized: env === 'production',
  },
  migrations: [
    ApartmentsMigration1692915591824,
    BookingsMigration1692916162938,
  ],
  // entities: ['./entities/*.entity.{ts,js}'],
  entities: [ApartmentEntity, BookingsEntity],
};

export default config;
