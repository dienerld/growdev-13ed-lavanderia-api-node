import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ApartmentsMigration1692915591824 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'apartments',
        columns: [
          {
            name: 'number',
            type: 'varchar',
            length: '5',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'name_resident',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'is_occupied',
            type: 'boolean',
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('apartments', true, true, true);
  }
}
