-- CreateTable
CREATE TABLE "dre" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "descricao" TEXT,
    "categoriaId" TEXT,

    CONSTRAINT "dre_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "dre" ADD CONSTRAINT "dre_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;
