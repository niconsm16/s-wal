export interface IWalletDto {
    address: string
}


export interface IDataWalletDto {
    address: string,
    firstTransaction: Date,
    balanceEth: number
}