import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity';
import { BusinessLogicException, BusinessError } from '../shared/errors/business-errors';

@Injectable()
export class EstudianteService {
    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>,
    ) {}

    async crearEstudiante(estudiante: EstudianteEntity): Promise<EstudianteEntity> {
        if (estudiante.codigo_estudiante.length !== 10) {
            throw new BusinessLogicException("el código de estudiante debe tener 10 caracteres", BusinessError.PRECONDITION_FAILED);
        }
        return await this.estudianteRepository.save(estudiante);
    }

    async findEstudianteById(id: string): Promise<EstudianteEntity> {
        const estudiante = await this.estudianteRepository.findOne({ where: { id } });
        if (!estudiante) {
            throw new BusinessLogicException("The estudiante with the given id was not found", BusinessError.NOT_FOUND);
        }
        return estudiante;
    }
}
