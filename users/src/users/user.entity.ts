import {AfterInsert, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserMonsters} from "./user_monsters.entity";
import {Transaction} from "../transactions/transaction.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    name: string

    @Column()
    credits: number

    @OneToMany(() => UserMonsters, userMonsters => userMonsters.user) monsters: UserMonsters[]
    @OneToMany(() => Transaction, transaction => transaction.user) transactions: Transaction[]

    @AfterInsert()
    logInsert() {
        console.log('Inserted User with id', this.id);
    }
}