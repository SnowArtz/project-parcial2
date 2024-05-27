/* eslint-disable prettier/prettier */
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorEntity } from '../../profesor/profesor.entity';
import { EstudianteEntity } from '../../estudiante/estudiante.entity';
import { PropuestaEntity } from '../../propuesta/propuesta.entity';
import { ProyectoEntity } from '../../proyecto/proyecto.entity';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [ProfesorEntity, EstudianteEntity, PropuestaEntity, ProyectoEntity],
    synchronize: true,
    keepConnectionAlive: true,
  }),
  TypeOrmModule.forFeature([ProfesorEntity, EstudianteEntity, PropuestaEntity, ProyectoEntity]),
];
