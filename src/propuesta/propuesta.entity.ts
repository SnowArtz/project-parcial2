/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, OneToOne,ManyToOne, JoinColumn } from 'typeorm';
import { ProyectoEntity } from "../proyecto/proyecto.entity";
import { ProfesorEntity } from "../profesor/profesor.entity";

@Entity()
export class PropuestaEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;
 
 @Column()
 titulo: string;
 
 @Column()
descripcion: string;
 
@Column()
palabra_clave: string;

@OneToOne(() => ProyectoEntity, proyecto => proyecto.propuesta)
@JoinColumn()
proyecto: ProyectoEntity;

    @ManyToOne(() => ProfesorEntity, profesor => profesor.propuestas)
    profesor: ProfesorEntity;

}