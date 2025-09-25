import { UniqueEntityId } from '@src/core/entities/unique-entity-id'
import { right } from './../../../core/either'
import { Injectable } from '@nestjs/common'
import { Either } from 'src/core/either'
import { Categoria } from '@src/domain/entities/categoria'
import { CustoRepository } from '@src/domain/repositories/custo-repository'

interface FetchRecentCustosUseCaseRequest {
  custoId?: string
  pageIndex: number
  name?: string
  categoriaId?: string
}

type FetchRecentCustosUseCaseResponse = Either<
  null,
  {
    custo: {
      id: UniqueEntityId
      name: string
      descricao?: string | null
      categoriaId?: string | null
      createdAt: Date
      updatedAt?: Date | null
      categoria?: Categoria | null
    }[]
    meta: {
      pageIndex: number
      perPage: number
      totalCount: number | null
    }
  }
>

@Injectable()
export class FetchCustoUseCase {
  constructor(private custoRepository: CustoRepository) {}

  async execute({
    pageIndex,
    name,
    categoriaId,
  }: FetchRecentCustosUseCaseRequest): Promise<FetchRecentCustosUseCaseResponse> {
    const custos = await this.custoRepository.findMany(
      { pageIndex },
      name ?? '',
      categoriaId,
    )

    const totalCount = custos.length

    return right({
      custo: custos,
      meta: { pageIndex, perPage: 10, totalCount },
    })
  }
}
