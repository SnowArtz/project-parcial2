import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfesorService } from './profesor.service';
import { ProfesorEntity } from './profesor.entity';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('ProfesorService', () => {
  let service: ProfesorService;
  let repository: Repository<ProfesorEntity>;
  let profesorList: ProfesorEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProfesorService],
    }).compile();

    service = module.get<ProfesorService>(ProfesorService);
    repository = module.get<Repository<ProfesorEntity>>(getRepositoryToken(ProfesorEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    profesorList = [];
    for(let i = 0; i < 5; i++){
      const profesor: ProfesorEntity = await repository.save({
        no_cedula: faker.number.int(),
        nombre: faker.person.firstName(),
        grupo_investigacion: "TICSW",
        no_extension: faker.number.int(),
      });
      profesorList.push(profesor);
    }
  };

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('crear debería retornar un nuevo profesor', async () => {
    const profesor: ProfesorEntity = {
      id: "",
      no_cedula: faker.number.int(),
      nombre: faker.person.firstName(),
      grupo_investigacion: "TICSW",
      no_extension: faker.number.int(),
      propuestas: [],
    };

    const newProfesor: ProfesorEntity = await service.crearProfesor(profesor);
    expect(newProfesor).not.toBeNull();

    const storedProfesor: ProfesorEntity = await repository.findOne({ where: { id: newProfesor.id } });
    expect(storedProfesor).not.toBeNull();
    expect(storedProfesor.nombre).toEqual(newProfesor.nombre);
  });

  it('crear debería lanzar una excepción por un grupo inválido', async () => {
    const profesor: ProfesorEntity = {
      id: "",
      no_cedula: faker.number.int(),
      nombre: faker.person.firstName(),
      grupo_investigacion: "INVALIDO",
      no_extension: faker.number.int(),
      propuestas: [],
    };

    await expect(service.crearProfesor(profesor)).rejects.toHaveProperty("message", "Grupo de investigacion no valido");
  });

  it('findOne debería retornar un profesor por id', async () => {
    const storedProfesor: ProfesorEntity = profesorList[0];
    const profesor: ProfesorEntity = await service.findProfesorById(storedProfesor.id);
    expect(profesor).not.toBeNull();
    expect(profesor.nombre).toEqual(storedProfesor.nombre);
  });

  it('findOne debería lanzar una excepción por un profesor inválido', async () => {
    await expect(service.findProfesorById("0")).rejects.toHaveProperty("message", "The profesor with the given id was not found");
  });

  it('delete debería remover un profesor', async () => {
    const profesor: ProfesorEntity = profesorList[0];
    await service.eliminarProfesorById(profesor.id);

    const deletedProfesor: ProfesorEntity = await repository.findOne({ where: { id: profesor.id } });
    expect(deletedProfesor).toBeNull();
  });

  it('delete debería lanzar una excepción por un profesor inválido', async () => {
    const profesor: ProfesorEntity = profesorList[0];
    await service.eliminarProfesorById(profesor.id);
    await expect(service.eliminarProfesorById("0")).rejects.toHaveProperty("message", "The profesor with the given id was not found");
  });
});
