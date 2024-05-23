/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, OneToOne ,JoinColumn} from 'typeorm';
import { EstudianteEntity } from "../estudiante/estudiante.entity";
import { PropuestaEntity } from "../propuesta/propuesta.entity";

@Entity()
export class ProyectoEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;
 
 @Column()
 fecha_inicio: Date;
 
 @Column()
fecha_fin: Date;
 
@Column()
URL: string;

@OneToOne(() => EstudianteEntity, estudiante => estudiante.proyecto)
    estudiante: EstudianteEntity;

    @OneToOne(() => PropuestaEntity, propuesta => propuesta.proyecto)
    @JoinColumn()
    propuesta: PropuestaEntity;

}