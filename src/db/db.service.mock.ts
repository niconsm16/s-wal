import { Prisma, PrismaPromise, wallets } from "@prisma/client";

export class MockDbService {

    wallets = {
        findMany: async () => [
            {
                address: '0xf7858da8a6617f7c6d0ff2bcafdb6d2eedf64840',
                fav: false,
                balanceEth: 35397,
                firstTransaction: new Date('2022-11-03T12:32:11.000Z'),
                createdAt: new Date('2023-12-19T16:35:56.919Z'),
                updatedAt: new Date('2023-12-19T20:49:35.903Z')
            },
            {
                address: '0x9696f59e4d72e237be84ffd425dcad154bf96976',
                fav: true,
                balanceEth: 15410,
                firstTransaction: new Date('2021-05-24T10:11:59.000Z'),
                createdAt: new Date('2023-12-19T16:34:19.150Z'),
                updatedAt: new Date('2023-12-20T03:21:54.195Z')
            }
        ],

        create: async ({ data }): Promise<void> => { },

        update: async ({ data, where }): Promise<void> => {
            if (where.address === '' ||
                where.address.length !== 42)
                throw Error()
        },

        delete: async ({ where }): Promise<void> => {
            if (where.address === '' ||
                where.address.length !== 42)
                throw Error()
        }
    }
}
