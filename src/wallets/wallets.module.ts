import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { DbService } from 'src/db/db.service';
import { UrlsService } from 'src/urls/urls.service';
import { ConfigService } from '@nestjs/config';


@Module({
  controllers: [ WalletsController ],
  providers: [
    WalletsService,
    ConfigService,
    UrlsService,
    DbService
  ]
})
export class WalletsModule { }
