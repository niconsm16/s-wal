import { PartialType } from '@nestjs/mapped-types';
import { CreateWalletDto } from './create-wallet.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateWalletDto extends PartialType(CreateWalletDto) {
    @ApiProperty()
    address: string

    @ApiProperty()
    fav: boolean
}
