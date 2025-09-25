import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PaginationParams } from '@src/core/repositories/pagination-params'
import { CustoRepository } from '@src/domain/repositories/custo-repository'
import { Custo } from '@src/domain/entities/custo'
import { PrismaCustoMapper } from '../mappers/prisma-custo-mapper'

@Injectable()
export class PrismaCustoRepository implements CustoRepository {
  constructor(private prisma: PrismaService) {}

  async create(custo: Custo) {
    const data = PrismaCustoMapper.toPrisma(custo)

    await this.prisma.custo.create({
      data,
    })
  }

  async findById(id: string) {
    const custo = await this.prisma.custo.findUnique({
      where: {
        id,
      },
    })

    if (!custo) {
      return null
    }

    return PrismaCustoMapper.toDomain(custo)
  }

  async findByName(name: string) {
    const custo = await this.prisma.custo.findFirst({
      where: {
        name,
      },
    })

    if (!custo) {
      return null
    }

    return PrismaCustoMapper.toDomain(custo)
  }

  async findMany(
    { pageIndex }: PaginationParams,
    name?: string,
    categoriaId?: string,
  ) {
    const categoria = await this.prisma.custo.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
      skip: (pageIndex - 1) * 10,
      where: {
        ...(name && { name: { contains: name } }),
        ...(categoriaId && { categoriaId }),
      },
      include: {
        categoria: true,
      },
    })

    return categoria.map(PrismaCustoMapper.toDomain)
  }

  async save(custo: Custo) {
    const data = PrismaCustoMapper.toPrisma(custo)

    await this.prisma.custo.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(custo: Custo) {
    const data = PrismaCustoMapper.toPrisma(custo)

    await this.prisma.custo.delete({
      where: {
        id: data.id,
      },
    })
  }
}
