import { Persona } from "../../persona/entities/persona.entity";
import { Column, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    mail: string;

    @OneToOne(() => Persona, persona => persona.user)
    @JoinColumn() 
    persona: Persona;
}
