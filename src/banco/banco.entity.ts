import { Credito } from "src/tipo_credito/tipo_credito.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'banco'})
export class Banco{
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true, type: "varchar", length: 25, nullable: false})
    nom_ban: string

    @Column({type: "varchar", nullable: false})
    log_ban: string

    @Column({type: "real", nullable: false})
    tas_ban: number

    @OneToMany(() => Credito, credito => credito.banco)
    credito: Credito[]
}