import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let repository: Repository<EstudianteEntity>;
  let estudianteList: EstudianteEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EstudianteService],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    estudianteList = [];
    for(let i = 0; i < 5; i++){
      const estudiante: EstudianteEntity = await repository.save({
        nombre: faker.person.firstName(),
        codigo_estudiante: faker.string.alphanumeric(10),
        no_creditos_aprobados: faker.number.int({ min: 1, max: 100 }),
      });
      estudianteList.push(estudiante);
    }
  };

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('crear debería retornar un nuevo estudiante', async () => {
    const estudiante: EstudianteEntity = {
      id: "",
      nombre: faker.person.firstName(),
      codigo_estudiante: faker.string.alphanumeric(10),
      no_creditos_aprobados: faker.number.int({ min: 1, max: 100 }),
      proyecto: null,
    };

    const newEstudiante: EstudianteEntity = await service.crearEstudiante(estudiante);
    expect(newEstudiante).not.toBeNull();

    const storedEstudiante: EstudianteEntity = await repository.findOne({ where: { id: newEstudiante.id } });
    expect(storedEstudiante).not.toBeNull();
    expect(storedEstudiante.nombre).toEqual(newEstudiante.nombre);
  });

  it('crear debería lanzar una excepción por un código de estudiante inválido', async () => {
    const estudiante: EstudianteEntity = {
      id: "",
      nombre: faker.person.firstName(),
      codigo_estudiante: faker.string.alphanumeric(5),
      no_creditos_aprobados: faker.number.int({ min: 1, max: 100 }),
      proyecto: null,
    };

    await expect(service.crearEstudiante(estudiante)).rejects.toHaveProperty("message", "el código de estudiante debe tener 10 caracteres");
  });

  it('findOne debería retornar un estudiante por id', async () => {
    const storedEstudiante: EstudianteEntity = estudianteList[0];
    const estudiante: EstudianteEntity = await service.findEstudianteById(storedEstudiante.id);
    expect(estudiante).not.toBeNull();
    expect(estudiante.nombre).toEqual(storedEstudiante.nombre);
  });

  it('findOne debería lanzar una excepción por un estudiante inválido', async () => {
    await expect(service.findEstudianteById("0")).rejects.toHaveProperty("message", "The estudiante with the given id was not found");
  });
});
