/*
  Warnings:

  - You are about to drop the `Wallets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Wallets";

-- CreateTable
CREATE TABLE "wallets" (
    "address" TEXT NOT NULL,
    "fav" BOOLEAN NOT NULL DEFAULT false,
    "old" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("address")
);
