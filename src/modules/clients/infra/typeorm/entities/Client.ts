import { City } from '@modules/cities/infra/typeorm/entities/City';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  city: City;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Client };
