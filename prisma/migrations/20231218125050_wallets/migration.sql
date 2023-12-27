/*
  Warnings:

  - You are about to drop the column `old` on the `wallets` table. All the data in the column will be lost.
  - Added the required column `first` to the `wallets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wallets" DROP COLUMN "old",
ADD COLUMN     "first" TIMESTAMP(3) NOT NULL;
