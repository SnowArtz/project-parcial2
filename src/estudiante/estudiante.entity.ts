/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn,JoinColumn,OneToOne } from 'typeorm';
import { ProyectoEntity } from "../proyecto/proyecto.entity";

@Entity()
export class EstudianteEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;
 
 @Column()
 nombre: string;
 
 @Column()
codigo_estudiante: string;
 
 @Column()
 no_creditos_aprobados: number;

 @OneToOne(() => ProyectoEntity, proyecto => proyecto.estudiante)
   proyecto: ProyectoEntity;

}