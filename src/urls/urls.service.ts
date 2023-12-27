import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IWalletData } from './urls.interface';


@Injectable()
export class UrlsService {

    private readonly key: string;

    private readonly url = 'https://api.etherscan.io/api';
    private readonly module = 'module=account'
    private readonly actionHistory = 'action=txlist'
    private readonly actionBalance = 'action=balance'
    private readonly start = 'startblock=0'
    private readonly end = 'endblock=99999999'
    private readonly toShow = 'page=1&offset=2'
    private readonly sort = 'sort=asc'
    private readonly tag = 'tag=latest'

    private readonly error = {
        status: '0',
        message: 'error connection',
        result: '0'
    }

    constructor(private readonly configService: ConfigService) {
        this.key = this.configService.get('ETHERSCAN_APIKEY');
    }

    // GetURLs
    private getUrlHistory = (address: string) =>
        `${this.url}?${this.module}&${this.actionHistory}&${this.start}&${this.end}&${this.toShow}&${this.sort}&address=${address}&apikey=${this.key}`;


    private getUrlBalance = (address: string) =>
        `${this.url}?${this.module}&${this.actionBalance}&address=${address}&${this.tag}&apikey=${this.key}`;



    getWalletDataHistory = async (address: string): Promise<IWalletData> => {
        try {
            const url = this.getUrlHistory(address);
            const response = await fetch(url);
            const data = await response.json();
            return data;
        }
        catch (e) {
            return this.error;
        }
    }


    getWalletDataBalance = async (address: string): Promise<string> => {
        const url = this.getUrlBalance(address);
        const response = await fetch(url);
        const data = await response.json();
        return data.result;
    }
}

