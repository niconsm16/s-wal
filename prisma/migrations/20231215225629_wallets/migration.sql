-- CreateTable
CREATE TABLE "Wallets" (
    "address" TEXT NOT NULL,
    "fav" BOOLEAN NOT NULL DEFAULT false,
    "old" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wallets_pkey" PRIMARY KEY ("address")
);
