import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Customer } from './customer.model';
import { Campaign } from './campaign.model';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer_id: number;

  @ManyToOne(() => Customer, customer => customer.users)
  @JoinColumn({ name: "customer_id" }) 
  customer: Customer;

  @OneToMany(() => Campaign, campaign => campaign.user)
  campaigns: Campaign[];

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;
}
