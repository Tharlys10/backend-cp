import { City } from '@modules/cities/infra/typeorm/entities/City';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('clients')
class Client {
  @PrimaryColumn()
  id: string;

  @Column()
  full_name: string;

  @Column()
  gender: 'masculine' | 'feminine';

  @Column()
  date_nasc: Date;

  @Column()
  age: number;

  @Column()
  city_id: string;

  @ManyToOne(() => City, (city) => city.clients)
  @JoinColumn({ name: 'city_id' })
  city: City;

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

export { Client };
