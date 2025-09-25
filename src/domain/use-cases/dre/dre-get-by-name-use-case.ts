import { right } from './../../../core/either'
import { Injectable } from '@nestjs/common'
import { Dre } from '@src/domain/entities/dre'
import { DreRepository } from '@src/domain/repositories/dre-repository'
import { Either, left } from 'src/core/either'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'

interface GetByNameDreUseCaseRequest {
  name: string
}

type GetByNameDreUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    dre: Dre
  }
>

@Injectable()
export class GetByNameDreUseCase {
  constructor(private dreRepository: DreRepository) {}

  async execute({
    name,
  }: GetByNameDreUseCaseRequest): Promise<GetByNameDreUseCaseResponse> {
    const dre = await this.dreRepository.findByName(name)

    if (!dre) {
      return left(new ResourceNotFoundError())
    }

    return right({ dre })
  }
}
