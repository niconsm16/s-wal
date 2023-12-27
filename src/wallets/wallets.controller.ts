import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';


@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) { }

  @Get()
  async findAll() {
    return await this.walletsService.findAllWallets();
  }


  @Post()
  async create(@Body() createWalletDto: CreateWalletDto) {
    return await this.walletsService.createWallet(createWalletDto);
  }


  @Patch(':address')
  update(
    @Param('address') address: string,
    @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletsService.updateWallet({ address }, updateWalletDto);
  }


  @Delete(':address')
  remove(@Param('address') address: string) {
    return this.walletsService.removeWallet({ address });
  }
}
