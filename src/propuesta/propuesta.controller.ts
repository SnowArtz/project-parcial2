import { Controller, Get, Post, Delete, Param, Body, UseInterceptors, HttpCode, HttpStatus } from '@nestjs/common';
import { PropuestaService } from './propuesta.service';
import { PropuestaEntity } from './propuesta.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';

@Controller('propuestas')
@UseInterceptors(BusinessErrorsInterceptor) 
export class PropuestaController {
    constructor(private readonly propuestaService: PropuestaService) {}

    @Post()
    async create(@Body() propuesta: PropuestaEntity): Promise<PropuestaEntity> {
        return await this.propuestaService.crearPropuesta(propuesta);
    }

    @Get()
    async findAll(): Promise<PropuestaEntity[]> {
        return await this.propuestaService.findAllPropuestas();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<PropuestaEntity> {
        return await this.propuestaService.findPropuestaById(id);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteById(@Param('id') id: string): Promise<void> {
        return await this.propuestaService.deletePropuestaById(id);
    }
}
