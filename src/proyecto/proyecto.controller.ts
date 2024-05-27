import { Controller, Post, Body } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoEntity } from './proyecto.entity';

@Controller('proyectos')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Post()
  async create(@Body() proyecto: ProyectoEntity): Promise<ProyectoEntity> {
    return await this.proyectoService.crearProyecto(proyecto);
  }
}
