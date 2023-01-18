import { Entity, Column, ManyToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm';
import { Permission } from './Permission';

/**
 * This entity contains a role that can be assigned to a user. A role contains
 * 1 to many permissions that allow a user to access secific features
 */
@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Permission, { cascade: ['insert', 'update'] })
  @JoinTable({
    name: 'role_permission_junction',
    joinColumn: {
      name: 'role_fk',
    },
    inverseJoinColumn: {
      name: 'permission_fk',
    },
  })
  permissions: Permission[];
}
