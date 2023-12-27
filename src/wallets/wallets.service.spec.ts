import { wallets, Prisma } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { DbService } from 'src/db/db.service';
import { WalletsService } from './wallets.service';
import { UrlsService } from 'src/urls/urls.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { MockDbService } from 'src/db/db.service.mock';


describe('WalletsService', () => {
  let dbService: DbService;
  let service: WalletsService;
  let result: wallets[];

  beforeAll(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletsService,
        ConfigService,
        UrlsService,
        {
          provide: DbService,
          useValue: new MockDbService()
        }
      ]
    }).compile();

    service = module.get<WalletsService>(WalletsService);
    result = await service.findAllWallets();
  });


  const realWallet: CreateWalletDto = { address: '0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326' }
  const errorWallet: CreateWalletDto = { address: '0x1f9090aaE28b8a3dCeaDf281B0F12828e67' }
  const badFormatWallet: CreateWalletDto = { address: '123' }
  const emptyWallet: CreateWalletDto = { address: '' }

  const data: Prisma.walletsUpdateInput = { fav: true }


  describe('findAllWallets', () => {

    const walletObject: wallets = {
      address: expect.any(String),
      fav: expect.any(Boolean),
      balanceEth: expect.any(Number),
      firstTransaction: expect.any(Date),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    };


    it('Returns an Array', async () => {
      expect(result.length).toBeGreaterThanOrEqual(0);
      expect(result).toBeInstanceOf(Array);
    });


    it('Returns an object of type "wallets"', async () => {
      result.length > 0 &&
        expect(result[ 0 ]).toMatchObject<wallets>(walletObject);
    });
  });


  describe('createWallet', () => {

    it('Receive an empty address', async () => {
      const result = await service.createWallet(emptyWallet);
      expect(result.error).toBe(true);
      expect(result.message).toBe('Empty data');
    })


    it('Receives an error address', async () => {
      const result = await service.createWallet(errorWallet);
      expect(result.error).toBe(true);
      expect(result.message).toBe('No transactions found');
    })


    it('Receives an misformatted address', async () => {
      const result = await service.createWallet(badFormatWallet);
      expect(result.error).toBe(true);
      expect(result.message).toBe('Error! Invalid address format');
    })


    it('Receives a real address', async () => {
      const result = await service.createWallet(realWallet);
      expect(result.message).toBe('Successful operation');
    })


  })


  describe('updateWallet', () => {

    it('Receives correct data', async () => {
      const result = await service.updateWallet(realWallet, data);
      expect(result.error).toBe(false);
      expect(result.message).toBe('Successful operation');
    })


    it('Receives an empty address', async () => {
      const result = await service.updateWallet(emptyWallet, data);
      expect(result.error).toBe(true);
      expect(result.message).toBe('error connection');
    })


    it('Receives an error address', async () => {
      const result = await service.updateWallet(errorWallet, data);
      expect(result.error).toBe(true);
      expect(result.message).toBe('error connection');
    })


    it('Receives an misformatted address', async () => {
      const result = await service.updateWallet(badFormatWallet, data);
      expect(result.error).toBe(true);
      expect(result.message).toBe('error connection');
    })

  })


  describe('removeWallet', () => {

    it('Receives correct data', async () => {
      const result = await service.removeWallet(realWallet);
      expect(result.error).toBe(false);
      expect(result.message).toBe('Successful operation');
    })


    it('Receives an empty address', async () => {
      const result = await service.removeWallet(emptyWallet);
      expect(result.error).toBe(true);
      expect(result.message).toBe('error connection');
    })


    it('Receives an error address', async () => {
      const result = await service.removeWallet(errorWallet);
      expect(result.error).toBe(true);
      expect(result.message).toBe('error connection');
    })


    it('Receives an misformatted address', async () => {
      const result = await service.removeWallet(badFormatWallet);
      expect(result.error).toBe(true);
      expect(result.message).toBe('error connection');
    })

  })
});
