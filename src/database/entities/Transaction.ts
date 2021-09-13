import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  institution_account_id: string;

  @Column()
  wallet_id: string;

  @Column()
  address: string;

  @Column({ type: 'decimal', precision: 13, scale: 2, default: 0 })
  amount: number;

  @Column()
  transaction_id: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
