import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'
import { Either, left, right } from 'src/core/either'
import { Custo } from '@src/domain/entities/custo'
import { CustoRepository } from '@src/domain/repositories/custo-repository'

interface DeleteCustoUseCaseRequest {
  id: string
}

type DeleteCustoUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    custo: Custo
  }
>

@Injectable()
export class DeleteCustoUseCase {
  constructor(private custoRepository: CustoRepository) {}

  async execute({
    id,
  }: DeleteCustoUseCaseRequest): Promise<DeleteCustoUseCaseResponse> {
    const custo = await this.custoRepository.findById(id)

    if (!custo) {
      return left(new ResourceNotFoundError())
    }

    await this.custoRepository.delete(custo)

    return right({ custo })
  }
}
