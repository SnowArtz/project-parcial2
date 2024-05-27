import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProyectoService } from './proyecto.service';
import { ProyectoEntity } from './proyecto.entity';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('ProyectoService', () => {
  let service: ProyectoService;
  let repository: Repository<ProyectoEntity>;
  let proyectoList: ProyectoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProyectoService],
    }).compile();

    service = module.get<ProyectoService>(ProyectoService);
    repository = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    proyectoList = [];
    for(let i = 0; i < 5; i++){
      const proyecto: ProyectoEntity = await repository.save({
        fecha_inicio: faker.date.past(),
        fecha_fin: faker.date.future(),
        URL: faker.internet.url(),
      });
      proyectoList.push(proyecto);
    }
  };

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('crear debería retornar un nuevo proyecto', async () => {
    const proyecto: ProyectoEntity = {
      id: "",
      fecha_inicio: faker.date.past(),
      fecha_fin: faker.date.future(),
      URL: faker.internet.url(),
      estudiante: null,
      propuesta: null,
    };

    const newProyecto: ProyectoEntity = await service.crearProyecto(proyecto);
    expect(newProyecto).not.toBeNull();

    const storedProyecto: ProyectoEntity = await repository.findOne({ where: { id: newProyecto.id } });
    expect(storedProyecto).not.toBeNull();
    expect(storedProyecto.URL).toEqual(newProyecto.URL);
  });

  it('crear debería lanzar una excepción por un rango de fechas inválido', async () => {
    const proyecto: ProyectoEntity = {
      id: "",
      fecha_inicio: faker.date.future(),
      fecha_fin: faker.date.past(),
      URL: faker.internet.url(),
      estudiante: null,
      propuesta: null,
    };

    await expect(service.crearProyecto(proyecto)).rejects.toHaveProperty("message", "Valide que la fecha de fin es posterior a la fecha de inicio.");
  });
});
