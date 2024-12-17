import { User } from "../../users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Persona {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellidos: string;

    @OneToMany(()=>User, user=>user.persona)
    @JoinColumn()
    user: User;
}
