import { Entity, Column, PrimaryGeneratedColumn, IntegerType } from "typeorm"

@Entity({name: 'admins'})
export class Admin{
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true, nullable: false})
    ced_adm: number

    @Column({type: "varchar", length: 25, nullable: false})
    nom_adm: string

    @Column({type: "varchar", length: 25, nullable: false})
    ape_adm: string
    
    @Column({type: "varchar", length: 30, nullable: false})
    dir_adm: string
    
    @Column({unique: true, nullable: false})
    tel_adm: number

    @Column({unique: true, type: "varchar", length: 25, nullable: false})
    cor_adm: string

    @Column({type: "varchar", length: 100000, nullable: false})
    con_adm: string
}