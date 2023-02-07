/*
  Warnings:

  - Added the required column `type` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Made the column `symbol` on table `Payment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "symbol" SET NOT NULL;
