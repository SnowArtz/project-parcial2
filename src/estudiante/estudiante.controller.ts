import { Controller, Get, Post, Param, Body, UseInterceptors } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';

@Controller('estudiantes')
@UseInterceptors(BusinessErrorsInterceptor)
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  async create(@Body() estudiante: EstudianteEntity): Promise<EstudianteEntity> {
    return await this.estudianteService.crearEstudiante(estudiante);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<EstudianteEntity> {
    return await this.estudianteService.findEstudianteById(id);
  }
}
