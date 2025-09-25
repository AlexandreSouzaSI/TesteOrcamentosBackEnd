import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PaginationParams } from '@src/core/repositories/pagination-params'
import { DreRepository } from '@src/domain/repositories/dre-repository'
import { PrismaDreMapper } from '../mappers/prisma-dre-mapper'
import { Dre } from '@src/domain/entities/dre'

@Injectable()
export class PrismaDreRepository implements DreRepository {
  constructor(private prisma: PrismaService) {}

  async create(dre: Dre) {
    const data = PrismaDreMapper.toPrisma(dre)

    await this.prisma.dre.create({
      data,
    })
  }

  async findById(id: string) {
    const dre = await this.prisma.dre.findUnique({
      where: {
        id,
      },
      include: {
        categoria: true,
      },
    })

    if (!dre) {
      return null
    }

    return PrismaDreMapper.toDomain(dre)
  }

  async findByName(name: string) {
    const dre = await this.prisma.dre.findFirst({
      where: {
        name,
      },
      include: {
        categoria: true,
      },
    })

    if (!dre) {
      return null
    }

    return PrismaDreMapper.toDomain(dre)
  }

  async findMany({ pageIndex }: PaginationParams, name?: string) {
    const dre = await this.prisma.dre.findMany({
      take: 10,
      skip: (pageIndex - 1) * 10,
      where: {
        ...(name && { name: { contains: name, mode: 'insensitive' } }),
      },
      select: {
        id: true,
        name: true,
        descricao: true,
        categoriaId: true,
      },
    })

    return dre.map((dre) => PrismaDreMapper.toDomain(dre))
  }

  async save(dre: Dre) {
    const data = PrismaDreMapper.toPrisma(dre)

    await this.prisma.dre.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        descricao: data.descricao,
        categoriaId: data.categoriaId,
      },
    })
  }

  async delete(dre: Dre) {
    const data = PrismaDreMapper.toPrisma(dre)

    await this.prisma.dre.delete({
      where: {
        id: data.id,
      },
    })
  }
}
