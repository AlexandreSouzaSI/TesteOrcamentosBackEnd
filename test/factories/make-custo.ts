import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { Custo, CustoProps } from '@src/domain/entities/custo'
import { PrismaCustoMapper } from '@src/infra/database/prisma/mappers/prisma-custo-mapper'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'

export function makeCusto(
  override: Partial<CustoProps> = {},
  id?: UniqueEntityId,
) {
  const custo = Custo.create(
    {
      name: faker.person.firstName(),
      descricao: faker.lorem.lines(),
      ...override,
    },
    id,
  )

  return custo
}

@Injectable()
export class CustoFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaCusto(data: Partial<CustoProps> = {}): Promise<Custo> {
    const custo = makeCusto(data)

    await this.prisma.custo.create({
      data: PrismaCustoMapper.toPrisma(custo),
    })

    return custo
  }
}
