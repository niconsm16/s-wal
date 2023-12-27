import { resolve } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { WalletsModule } from './wallets/wallets.module';
import { UrlsService } from './urls/urls.service';


@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: resolve() + '/public'
    }),
    WalletsModule,
  ],
  controllers: [ AppController ],
  providers: [
    AppService,
    UrlsService
  ]
})
export class AppModule {
  constructor(private configService: ConfigService) { }
}
