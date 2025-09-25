import { right } from './../../../core/either'
import { Injectable } from '@nestjs/common'
import { Dre } from '@src/domain/entities/dre'
import { DreRepository } from '@src/domain/repositories/dre-repository'
import { Either, left } from 'src/core/either'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'

interface GetByIdDreUseCaseRequest {
  dreId: string
}

type GetByIdDreUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    dre: Dre
  }
>

@Injectable()
export class GetByIdDreUseCase {
  constructor(private dreRepository: DreRepository) {}

  async execute({
    dreId,
  }: GetByIdDreUseCaseRequest): Promise<GetByIdDreUseCaseResponse> {
    const dre = await this.dreRepository.findById(dreId)

    if (!dre) {
      return left(new ResourceNotFoundError())
    }

    return right({ dre })
  }
}
