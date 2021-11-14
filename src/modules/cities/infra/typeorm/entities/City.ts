import { Client } from '@modules/clients/infra/typeorm/entities/Client';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('cities')
class City {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  state: string;

  @OneToMany(() => Client, (client) => client.city)
  clients: Client[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { City };
