import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tenant_id: string;

  @Column()
  name: string;

  @Column('simple-array') // e.g., ["read:user", "delete:user"]
  permissions: string[];

  @ManyToMany(() => User, (user) => user.roles)
  @JoinTable()
  users: User[];
}
