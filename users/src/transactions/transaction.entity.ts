import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../users/user.entity";

type status = 'BORN' | 'PENDING'

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.transactions) user: User

    @Column()
    credits: number

    @Column()
    egg_level: number

    @Column()
    status: status

    @CreateDateColumn()
    created_at: Date
}