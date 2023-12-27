import { wallets as IWallet } from "@prisma/client";

export class Wallet implements IWallet {
    fav: boolean;
    address: string;
    balanceEth: number;
    firstTransaction: Date;
    createdAt: Date;
    updatedAt: Date;
}
