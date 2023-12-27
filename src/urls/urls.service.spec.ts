import { Test, TestingModule } from '@nestjs/testing';
import { UrlsService } from './urls.service';
import { ConfigService } from '@nestjs/config';

describe('UrlsService', () => {

  let delay = 0;
  let service: UrlsService;
  const addressBadFormat = '123abc';
  const addressOk = '0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326';
  const addressError = '0x03CFD4C34Aa8bC64A4f2d2f2F0f3139774175E2';


  const delayExecution = (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
      delay += 4500;
    });
  }


  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ UrlsService, ConfigService ],
    }).compile();

    service = module.get<UrlsService>(UrlsService);

  });

  afterEach(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
  })


  describe('getWalletDataHistory: ', () => {

    afterEach(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
    })

    const errors = {
      2: 'No transactions found',
      4: 'Error! Invalid address format',
    }


    it('Request Address: OK', async () => {
      await delayExecution();
      const response = await service.getWalletDataHistory(addressOk);

      expect(response.result.length).toBeGreaterThan(0);
    });


    it('Request Address: Error', async () => {
      await delayExecution();
      const response = await service.getWalletDataHistory(addressError);

      expect(response.message).toBe(errors[ 2 ]);
    });


    it('Request Address: Misformatted', async () => {
      await delayExecution();
      const response = await service.getWalletDataHistory(addressBadFormat);

      expect(response.result).toBe(errors[ 4 ]);
    });

  });


  describe('getWalletDataBalance: ', () => {

    afterEach(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
    })


    it('Wallet receive a value Greater Than or Equal Zero', async () => {
      await delayExecution();
      const response = await service.getWalletDataBalance(addressOk);

      expect(parseInt(response)).toBeGreaterThanOrEqual(0);
      expect(typeof response).toBe('string');
    });

  });



});
