import { Module } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorController } from './profesor.controller';

@Module({
  providers: [ProfesorService],
  controllers: [ProfesorController]
})
export class ProfesorModule {}
