import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import 'v4';

export abstract class BaseEntity {
  @PrimaryColumn()
  id!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
