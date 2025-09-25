import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { Dre, DreProps } from '@src/domain/entities/dre'
import { PrismaDreMapper } from '@src/infra/database/prisma/mappers/prisma-dre-mapper'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'

export function makeDre(override: Partial<DreProps> = {}, id?: UniqueEntityId) {
  const dre = Dre.create(
    {
      name: faker.person.firstName(),
      descricao: faker.lorem.lines(),
      categoriaId: faker.string.uuid() || null,
      ...override,
    },
    id,
  )

  return dre
}

@Injectable()
export class DreFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaDre(data: Partial<DreProps> = {}): Promise<Dre> {
    const dre = makeDre(data)

    await this.prisma.dre.create({
      data: PrismaDreMapper.toPrisma(dre),
    })

    return dre
  }
}
