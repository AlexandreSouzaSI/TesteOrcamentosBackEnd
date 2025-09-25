import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'
import { Either, left, right } from 'src/core/either'
import { Dre } from '@src/domain/entities/dre'
import { DreRepository } from '@src/domain/repositories/dre-repository'

interface DeleteDreUseCaseRequest {
  id: string
}

type DeleteDreUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    dre: Dre
  }
>

@Injectable()
export class DeleteDreUseCase {
  constructor(private dreRepository: DreRepository) {}

  async execute({
    id,
  }: DeleteDreUseCaseRequest): Promise<DeleteDreUseCaseResponse> {
    const dre = await this.dreRepository.findById(id)

    if (!dre) {
      return left(new ResourceNotFoundError())
    }

    await this.dreRepository.delete(dre)

    return right({ dre })
  }
}
