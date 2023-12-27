import { Prisma, wallets } from "@prisma/client";
import { MockDbService } from "src/db/db.service.mock"
import { CreateWalletDto } from "./dto/create-wallet.dto";
import { UpdateWalletDto } from "./dto/update-wallet.dto";

interface IWalletResponse {
    error: boolean,
    message: string
}


export class MockWalletsService {

    db = new MockDbService();

    findAllWallets = async ()
        : Promise<wallets[]> =>
        this.db.wallets.findMany();


    createWallet =
        async (data: CreateWalletDto)
            : Promise<IWalletResponse> => (
            { error: true, message: '' })


    updateWallet = async (data: UpdateWalletDto)
        : Promise<IWalletResponse> => (
        { error: true, message: '' });


    removeWallet = async (id: Prisma.walletsWhereInput)
        : Promise<IWalletResponse> => (
        { error: true, message: '' });

}