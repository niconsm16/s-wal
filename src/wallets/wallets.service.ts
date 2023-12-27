import { Injectable } from '@nestjs/common';
import { Prisma, PrismaPromise, wallets } from '@prisma/client';

import { DbService } from 'src/db/db.service';
import { UrlsService } from 'src/urls/urls.service';
import { IDataWalletDto } from './wallets.interface';
import { IWalletData } from 'src/urls/urls.interface';
import { CreateWalletDto } from './dto/create-wallet.dto';


@Injectable()
export class WalletsService {

  private readonly errors = {
    0: 'Successful operation',
    1: 'error connection',
    2: 'No transactions found',
    3: 'The address already exists in the database',
    4: 'Error! Invalid address format',
    5: 'Empty data'
  }

  constructor(
    private readonly db: DbService,
    private readonly url: UrlsService
  ) { }


  // Private

  private dateConverter = (timestamp: string) =>
    new Date(parseInt(timestamp) * 1000);


  private errorHandler = (code: number) =>
    ({ error: code !== 0, message: this.errors[ code ] })


  private readonly getError = (data: IWalletData) => {
    const errorConnection = data.message === this.errors[ 1 ];
    const noTransactions = data.message === this.errors[ 2 ];
    const badAddress = data.result === this.errors[ 4 ];

    if (errorConnection) return 1;
    if (noTransactions) return 2;
    if (badAddress) return 4;
    return 3
  }


  private ethConverter = (balance: string) => {
    const wei = BigInt(balance);
    const eth = 1000000000000000000n;
    return Number(wei / eth);
  }


  private createWalletData = (address: string, timestamp: string, balance: string): IDataWalletDto => ({
    firstTransaction: this.dateConverter(timestamp),
    balanceEth: this.ethConverter(balance),
    address,
  });


  // Public

  findAllWallets = async (): Promise<PrismaPromise<wallets[]>> => {
    try { return await this.db.wallets.findMany(); }
    catch (e) { return []; }
  }


  createWallet = async ({ address }: CreateWalletDto) => {

    if (address === '') return this.errorHandler(5);

    const walletData = await this.url.getWalletDataHistory(address);
    const error = this.getError(walletData)

    if (typeof walletData.result !== 'string'
      && walletData.result.length > 0) {

      try {
        const timestamp = walletData.result[ 0 ].timeStamp;
        const balance = await this.url.getWalletDataBalance(address);
        const data = this.createWalletData(address, timestamp, balance);
        await this.db.wallets.create({ data });
        return this.errorHandler(0);
      }
      catch (e) { return this.errorHandler(3); }
    }
    return this.errorHandler(error);
  }


  updateWallet = async (
    address: Prisma.walletsWhereUniqueInput,
    data: Prisma.walletsUpdateInput) => {

    try {
      await this.db.wallets.update({ data, where: address })
      return this.errorHandler(0);
    }
    catch (e) { return this.errorHandler(1); }
  }


  removeWallet = async (id: Prisma.walletsWhereUniqueInput) => {
    try {
      await this.db.wallets.delete({ where: id });
      return this.errorHandler(0);
    }
    catch (e) { return this.errorHandler(1); }
  }
}
