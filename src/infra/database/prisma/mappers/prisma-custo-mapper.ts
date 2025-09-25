import {
  Custo as PrismaCusto,
  Categoria as PrismaCategoria,
  Prisma,
} from '@prisma/client'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { PrismaCategoriaMapper } from './prisma-categoria-mapper'
import { Custo } from '@src/domain/entities/custo'

export class PrismaCustoMapper {
  static toDomain(
    raw: PrismaCusto & { categoria?: PrismaCategoria | null },
  ): Custo {
    const categoria = raw.categoria
      ? PrismaCategoriaMapper.toDomain(raw.categoria)
      : null
    return Custo.create(
      {
        name: raw.name,
        descricao: raw.descricao,
        categoriaId: raw.categoriaId ? raw.categoriaId : null,
        categoria: categoria ?? undefined,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(custo: Custo): Prisma.CustoUncheckedCreateInput {
    return {
      id: custo.id.toString(),
      name: custo.name,
      descricao: custo.descricao,
      categoriaId: custo.categoriaId ?? null,
    }
  }
}
