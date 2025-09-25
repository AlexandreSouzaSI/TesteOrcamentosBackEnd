import { Dre as PrismaDre, Prisma } from '@prisma/client'
import { Dre } from '@src/domain/entities/dre'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

export class PrismaDreMapper {
  static toDomain(raw: PrismaDre): Dre {
    return Dre.create(
      {
        name: raw.name,
        descricao: raw.descricao,
        categoriaId: raw.categoriaId,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(dre: Dre): Prisma.DreUncheckedCreateInput {
    return {
      id: dre.id.toString(),
      name: dre.name,
      descricao: dre.descricao,
      categoriaId: dre.categoriaId,
    }
  }
}
