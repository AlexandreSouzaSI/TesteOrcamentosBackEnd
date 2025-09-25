/*
  Warnings:

  - Made the column `produto` on table `categorias` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "categorias" ALTER COLUMN "produto" SET NOT NULL,
ALTER COLUMN "produto" SET DEFAULT true;
