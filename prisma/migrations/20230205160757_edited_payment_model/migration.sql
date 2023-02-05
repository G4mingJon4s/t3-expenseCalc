/*
  Warnings:

  - You are about to drop the `Income` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Income";

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "date" TEXT NOT NULL,
    "symbol" TEXT,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);
