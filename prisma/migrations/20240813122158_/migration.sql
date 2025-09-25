/*
  Warnings:

  - You are about to drop the column `categoriaId` on the `rendas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "rendas" DROP CONSTRAINT "rendas_categoriaId_fkey";

-- AlterTable
ALTER TABLE "despesas" ADD COLUMN     "custo_id" TEXT;

-- AlterTable
ALTER TABLE "rendas" DROP COLUMN "categoriaId",
ADD COLUMN     "categoria_id" TEXT,
ADD COLUMN     "custo_id" TEXT,
ADD COLUMN     "produto_id" TEXT;

-- CreateTable
CREATE TABLE "custos" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "descricao" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "categoriaId" TEXT,

    CONSTRAINT "custos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_custo_id_fkey" FOREIGN KEY ("custo_id") REFERENCES "custos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "custos" ADD CONSTRAINT "custos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rendas" ADD CONSTRAINT "rendas_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rendas" ADD CONSTRAINT "rendas_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rendas" ADD CONSTRAINT "rendas_custo_id_fkey" FOREIGN KEY ("custo_id") REFERENCES "custos"("id") ON DELETE SET NULL ON UPDATE CASCADE;
