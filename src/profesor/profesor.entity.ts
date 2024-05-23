/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn,OneToMany } from 'typeorm';
import { PropuestaEntity } from "../propuesta/propuesta.entity";

@Entity()
export class ProfesorEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 no_cedula: number;
 
 @Column()
 nombre: string;
 
 @Column()
 grupo_investigacion: string;
 
 @Column()
 no_extension: number;

 @Column()
 image: string;

 @OneToMany(() => PropuestaEntity, propuesta => propuesta.profesor)
    propuestas: PropuestaEntity[];
}