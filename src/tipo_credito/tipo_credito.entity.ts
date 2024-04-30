import { Banco } from "src/banco/banco.entity";
import { Cobros } from "src/cobro/cobro.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tipo_credito' })
export class Credito {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true, type: "varchar", length: 30, nullable: false})
    nom_cre: string

    @Column({type: "real", nullable: false})
    int_cre: number

    @Column({nullable: false})
    bancoId: number

    @ManyToOne(() => Banco, banco => banco.credito)
    banco: Banco

    @OneToMany(() => Cobros, cobro => cobro.credito)
    cobro: Cobros[]
}