import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Response } from 'express';


describe('AppController', () => {

  let appController: AppController;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ AppController ],
      providers: [ AppService ],
    }).compile();

    appController = app.get<AppController>(AppController);

  });


  describe('root', () => {
    it('Return static index.html', async () => {

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        sendFile: jest.fn(),
      } as Partial<Response>;

      appController.index(mockResponse as Response);

      expect(mockResponse.status)
        .toHaveBeenCalledWith(200);

      expect(mockResponse.sendFile)
        .toHaveBeenCalledWith(expect.stringContaining('/public/index.html'));

    });
  });
});
