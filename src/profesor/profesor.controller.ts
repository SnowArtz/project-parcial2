import { Controller, Get, Post, Delete, Param, Body, HttpCode, HttpStatus, UseInterceptors } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorEntity } from './profesor.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';

@Controller('profesores')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post()
  async create(@Body() profesor: ProfesorEntity): Promise<ProfesorEntity> {
    return await this.profesorService.crearProfesor(profesor);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProfesorEntity> {
    return await this.profesorService.findProfesorById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id') id: string): Promise<void> {
    return await this.profesorService.eliminarProfesorById(id);
  }

  @Delete('cedula/:cedula')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteByCedula(@Param('cedula') cedula: number): Promise<void> {
    return await this.profesorService.eliminarProfesorByCedula(cedula);
  }
}
