import { ApiProperty } from "@nestjs/swagger";
import { IWalletDto } from "../wallets.interface";

export class CreateWalletDto implements IWalletDto {
    @ApiProperty()
    address: string;
}
