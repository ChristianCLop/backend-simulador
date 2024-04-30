import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Credito } from 'src/tipo_credito/tipo_credito.entity'

@Entity({ name: 'cobros_indirectos' })
export class Cobros {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 25, nullable: false})
    nom_cob: string

    @Column({ type: "real", nullable: false})
    int_cob: number

    @Column({nullable: false})
    creditoId: number

    @Column({ default: 1, nullable: false})
    estado: number

    @ManyToOne(() => Credito, credito => credito.cobro)
    credito: Credito

}