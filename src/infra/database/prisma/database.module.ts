import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { PrismaUserRepository } from './repositories/prisma-user-repository'
import { PrismaRendaRepository } from './repositories/prisma-renda-repository'
import { UserRepository } from 'src/domain/repositories/user-repository'
import { RendaRepository } from 'src/domain/repositories/renda-repository'
import { DespesasRepository } from 'src/domain/repositories/despesas-repository'
import { PrismaDespesasRepository } from './repositories/prisma-despesas-repository'
import { CategoriaRepository } from '@src/domain/repositories/categoria-repository'
import { PrismaCategoriaRepository } from './repositories/prisma-categoria-repository'
import { ProdutoRepository } from '@src/domain/repositories/produto-repository'
import { PrismaProdutoRepository } from './repositories/prisma-produto-repository'
import { CustoRepository } from '@src/domain/repositories/custo-repository'
import { PrismaCustoRepository } from './repositories/prisma-custo-repository'
import { DreRepository } from '@src/domain/repositories/dre-repository'
import { PrismaDreRepository } from './repositories/prisma-dre-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: DespesasRepository,
      useClass: PrismaDespesasRepository,
    },
    {
      provide: RendaRepository,
      useClass: PrismaRendaRepository,
    },
    {
      provide: CategoriaRepository,
      useClass: PrismaCategoriaRepository,
    },
    {
      provide: ProdutoRepository,
      useClass: PrismaProdutoRepository,
    },
    {
      provide: CustoRepository,
      useClass: PrismaCustoRepository,
    },
    {
      provide: DreRepository,
      useClass: PrismaDreRepository,
    },
  ],
  exports: [
    PrismaService,
    UserRepository,
    DespesasRepository,
    RendaRepository,
    CategoriaRepository,
    ProdutoRepository,
    CustoRepository,
    DreRepository,
  ],
})
export class DatabaseModule {}
