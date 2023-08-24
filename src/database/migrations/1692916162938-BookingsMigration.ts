import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class BookingsMigration1692916162938 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bookings',
        columns: [
          {
            name: 'hour',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'machine',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'apartment_fk',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: 'bookings_apartment_fk',
            columnNames: ['apartment_fk'],
            referencedTableName: 'apartments',
            referencedColumnNames: ['number'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('bookings', true, true, true);
  }
}
