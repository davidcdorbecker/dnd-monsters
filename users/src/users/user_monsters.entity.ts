import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";

@Entity()
export class UserMonsters {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    monster_id: string

    @ManyToOne(type => User, user => user.monsters) user: User
}