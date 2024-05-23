import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProyectoEntity } from './proyecto.entity';
import { BusinessLogicException, BusinessError } from '../shared/errors/business-errors';

@Injectable()
export class ProyectoService {
    constructor(
        @InjectRepository(ProyectoEntity)
        private readonly proyectoRepository: Repository<ProyectoEntity>,
    ) {}

    async crearProyecto(proyecto: ProyectoEntity): Promise<ProyectoEntity> {
        if (proyecto.fecha_fin <= proyecto.fecha_inicio) {
            throw new BusinessLogicException("Valide que la fecha de fin es posterior a la fecha de inicio.", BusinessError.PRECONDITION_FAILED);
        }
        return await this.proyectoRepository.save(proyecto);
    }
}
