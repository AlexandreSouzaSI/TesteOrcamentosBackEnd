import { UniqueEntityId } from '@src/core/entities/unique-entity-id'
import { right } from './../../../core/either'
import { Injectable } from '@nestjs/common'
import { Either } from 'src/core/either'
import { DreRepository } from '@src/domain/repositories/dre-repository'

interface FetchRecentDreUseCaseRequest {
  pageIndex: number
  name?: string
}

type FetchDreUseCaseResponse = Either<
  null,
  {
    dre: {
      id: UniqueEntityId
      name: string
      descricao?: string | null
      categoriaId?: string | null
    }[]
    meta: {
      pageIndex: number
      perPage: number
      totalCount: number | null
    }
  }
>

@Injectable()
export class FetchDreUseCase {
  constructor(private dreRepository: DreRepository) {}

  async execute({
    pageIndex,
    name,
  }: FetchRecentDreUseCaseRequest): Promise<FetchDreUseCaseResponse> {
    const dre = await this.dreRepository.findMany({ pageIndex }, name)

    const totalCount = dre.length

    return right({ dre, meta: { pageIndex, perPage: 10, totalCount } })
  }
}
