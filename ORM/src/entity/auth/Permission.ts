import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * This entity contains the name of a permission. The name is what is used to determine
 * if a user has it through the has_permission db function. For example has_permission('MANAGE_PERMISSIONS') : bool
 */
@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;
}
