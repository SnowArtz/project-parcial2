import { Controller, Get, Param ,UseInterceptors} from '@nestjs/common';
import { PropuestaService } from './propuesta.service';
import { PropuestaEntity } from './propuesta.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';


@Controller('propuestas')
@UseInterceptors(BusinessErrorsInterceptor) 
export class PropuestaController {
    constructor(private readonly propuestaService: PropuestaService) {}

    @Get()
    async findAll(): Promise<PropuestaEntity[]> {
        return await this.propuestaService.findAllPropuestas();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<PropuestaEntity> {
        return await this.propuestaService.findPropuestaById(id);
    }
}
