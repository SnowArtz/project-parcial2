import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfesorEntity } from './profesor.entity';
import { BusinessLogicException, BusinessError } from '../shared/errors/business-errors';

@Injectable()
export class ProfesorService {
    constructor(
        @InjectRepository(ProfesorEntity)
        private readonly profesorRepository: Repository<ProfesorEntity>,
    ) {}

    async crearProfesor(profesor: ProfesorEntity): Promise<ProfesorEntity> {
        const validGroups = ['TICSW', 'IMAGINE', 'COMIT'];
        if (!validGroups.includes(profesor.grupo_investigacion)) {
            throw new BusinessLogicException("Grupo de investigacion no valido", BusinessError.PRECONDITION_FAILED);
        }
        return await this.profesorRepository.save(profesor);
    }

    async findProfesorById(id: string): Promise<ProfesorEntity> {
        const profesor = await this.profesorRepository.findOne({ where: { id }, relations: ["propuestas", "propuestas.proyecto"] });
        if (!profesor) {
            throw new BusinessLogicException("The profesor with the given id was not found", BusinessError.NOT_FOUND);
        }
        return profesor;
    }

    async eliminarProfesorById(id: string) {
        const profesor = await this.profesorRepository.findOne({ where: { id }, relations: ["propuestas", "propuestas.proyecto"] });
        if (!profesor) {
            throw new BusinessLogicException("The profesor with the given id was not found", BusinessError.NOT_FOUND);
        }

        for (const propuesta of profesor.propuestas) {
            if (propuesta.proyecto) {
                throw new BusinessLogicException("Can not delete profesor por las reglas del parcial", BusinessError.PRECONDITION_FAILED);
            }
        }

        await this.profesorRepository.remove(profesor);
    }

    async eliminarProfesorByCedula(no_cedula: number) {
        const profesor = await this.profesorRepository.findOne({ where: { no_cedula }, relations: ["propuestas", "propuestas.proyecto"] });
        if (!profesor) {
            throw new BusinessLogicException("The profesor with the given no_cedula was not found", BusinessError.NOT_FOUND);
        }

        for (const propuesta of profesor.propuestas) {
            if (propuesta.proyecto) {
                throw new BusinessLogicException("Can not delete profesor por las reglas del parcial", BusinessError.PRECONDITION_FAILED);
            }
        }

        await this.profesorRepository.remove(profesor);
    }
}
