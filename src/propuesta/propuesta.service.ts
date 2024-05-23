import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropuestaEntity } from './propuesta.entity';
import { BusinessLogicException, BusinessError } from '../shared/errors/business-errors';

@Injectable()
export class PropuestaService {
    constructor(
        @InjectRepository(PropuestaEntity)
        private readonly propuestaRepository: Repository<PropuestaEntity>,
    ) {}

    async crearPropuesta(propuesta: PropuestaEntity): Promise<PropuestaEntity> {
        if (!propuesta.titulo || propuesta.titulo.trim().length === 0) {
            throw new BusinessLogicException("titúlo no sea vacío", BusinessError.PRECONDITION_FAILED);
        }
        return await this.propuestaRepository.save(propuesta);
    }

    async findPropuestaById(id: string): Promise<PropuestaEntity> {
        const propuesta = await this.propuestaRepository.findOne({ where: { id }, relations: ["proyectos", "estudiantes", "profesor"] });
        if (!propuesta) {
            throw new BusinessLogicException("The propuesta with the given id was not found", BusinessError.NOT_FOUND);
        }
        return propuesta;
    }

    async findAllPropuestas(): Promise<PropuestaEntity[]> {
        return await this.propuestaRepository.find({ relations: ["proyectos", "estudiantes", "profesor"] });
    }

    async deletePropuestaById(id: string) {
        const propuesta = await this.propuestaRepository.findOne({ where: { id }, relations: ["proyectos"] });
        if (!propuesta) {
            throw new BusinessLogicException("The propuesta with the given id was not found", BusinessError.NOT_FOUND);
        }

        if (propuesta.proyectos.length > 0) {
            throw new BusinessLogicException("Cannot delete propuesta por las reglas del parcial", BusinessError.PRECONDITION_FAILED);
        }

        await this.propuestaRepository.remove(propuesta);
    }
}
