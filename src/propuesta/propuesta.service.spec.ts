import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropuestaService } from './propuesta.service';
import { PropuestaEntity } from './propuesta.entity';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('PropuestaService', () => {
  let service: PropuestaService;
  let repository: Repository<PropuestaEntity>;
  let propuestaList: PropuestaEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PropuestaService],
    }).compile();

    service = module.get<PropuestaService>(PropuestaService);
    repository = module.get<Repository<PropuestaEntity>>(getRepositoryToken(PropuestaEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    propuestaList = [];
    for(let i = 0; i < 5; i++){
      const propuesta: PropuestaEntity = await repository.save({
        titulo: faker.lorem.sentence(),
        descripcion: faker.lorem.paragraph(),
        palabra_clave: faker.lorem.word(),
      });
      propuestaList.push(propuesta);
    }
  };

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('crear debería retornar una nueva propuesta', async () => {
    const propuesta: PropuestaEntity = {
      id: "",
      titulo: faker.lorem.sentence(),
      descripcion: faker.lorem.paragraph(),
      palabra_clave: faker.lorem.word(),
      profesor: null,
      proyecto: null,
    };

    const newPropuesta: PropuestaEntity = await service.crearPropuesta(propuesta);
    expect(newPropuesta).not.toBeNull();

    const storedPropuesta: PropuestaEntity = await repository.findOne({ where: { id: newPropuesta.id } });
    expect(storedPropuesta).not.toBeNull();
    expect(storedPropuesta.titulo).toEqual(newPropuesta.titulo);
  });

  it('crear debería lanzar una excepción por un título vacío', async () => {
    const propuesta: PropuestaEntity = {
      id: "",
      titulo: "",
      descripcion: faker.lorem.paragraph(),
      palabra_clave: faker.lorem.word(),
      profesor: null,
      proyecto: null,
    };

    await expect(service.crearPropuesta(propuesta)).rejects.toHaveProperty("message", "titúlo no sea vacío");
  });

  it('findOne debería retornar una propuesta por id', async () => {
    const storedPropuesta: PropuestaEntity = propuestaList[0];
    const propuesta: PropuestaEntity = await service.findPropuestaById(storedPropuesta.id);
    expect(propuesta).not.toBeNull();
    expect(propuesta.titulo).toEqual(storedPropuesta.titulo);
  });

  it('findOne debería lanzar una excepción por una propuesta inválida', async () => {
    await expect(service.findPropuestaById("0")).rejects.toHaveProperty("message", "The propuesta with the given id was not found");
  });

  it('delete debería remover una propuesta', async () => {
    const propuesta: PropuestaEntity = propuestaList[0];
    await service.deletePropuestaById(propuesta.id);

    const deletedPropuesta: PropuestaEntity = await repository.findOne({ where: { id: propuesta.id } });
    expect(deletedPropuesta).toBeNull();
  });

  it('delete debería lanzar una excepción por una propuesta inválida', async () => {
    const propuesta: PropuestaEntity = propuestaList[0];
    await service.deletePropuestaById(propuesta.id);
    await expect(service.deletePropuestaById("0")).rejects.toHaveProperty("message", "The propuesta with the given id was not found");
  });
});
