import { Test, TestingModule } from '@nestjs/testing';
import { DbService } from './db.service';

describe('DbService', () => {
  let service: DbService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ DbService ],
    }).compile();

    service = module.get<DbService>(DbService);
  });


  afterAll(async () => {
    await service.$disconnect();
  });


  it('should connect to the database on initialization', async () => {
    const connectMock = jest.spyOn(service, '$connect');

    await service.onModuleInit();

    expect(connectMock).toHaveBeenCalled();
    expect(connectMock).toHaveBeenCalledTimes(1);
  });

});

