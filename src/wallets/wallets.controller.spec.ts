import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { WalletsService } from './wallets.service';
import { UrlsService } from 'src/urls/urls.service';
import { WalletsController } from './wallets.controller';
import { MockWalletsService } from './wallets.service.mock';


describe('WalletsController', () => {

  let controller: WalletsController;
  let mock: MockWalletsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ WalletsController ],
      providers: [ WalletsService,
        ConfigService,
        UrlsService,
        {
          provide: WalletsService,
          useValue: new MockWalletsService()
        } ],
    }).compile();

    controller = module.get<WalletsController>(WalletsController);
  });

  describe('Get: findAll', () => {

    it('Receives an Array', async () => {
      const result = await controller.findAll();
      expect(result).toBeInstanceOf(Array);
    });
  })


  describe('Post: create', () => {

    it('Receives a key: error: boolean', async () => {
      const result = await controller.create({ address: '' });
      expect(typeof result.error).toBe('boolean');
    });


    it('Receives a key: message: string', async () => {
      const result = await controller.create({ address: '' });
      expect(typeof result.message).toBe('string');
    });
  })


  describe('Patch: update', () => {

    it('Receives a key: error: boolean', async () => {
      const result = await controller.update('', { fav: true, address: '' });
      expect(typeof result.error).toBe('boolean');
    });


    it('Receives a key: message: string', async () => {
      const result = await controller.update('', { fav: true, address: '' });
      expect(typeof result.message).toBe('string');
    });
  });


  describe('Delete: remove', () => {

    it('Receives a key: error: boolean', async () => {
      const result = await controller.remove('');
      expect(typeof result.error).toBe('boolean');
    });


    it('Receives a key: message: string', async () => {
      const result = await controller.remove('');
      expect(typeof result.message).toBe('string');
    });
  });
});
