import { Custo } from '@src/domain/entities/custo'
import { right } from './../../../core/either'
import { Injectable } from '@nestjs/common'
import { Either, left } from 'src/core/either'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'
import { CustoRepository } from '@src/domain/repositories/custo-repository'

interface GetByNameCustoUseCaseRequest {
  name: string
}

type GetByNameCustoUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    custo: Custo
  }
>

@Injectable()
export class GetByNameCustoUseCase {
  constructor(private custoRepository: CustoRepository) {}

  async execute({
    name,
  }: GetByNameCustoUseCaseRequest): Promise<GetByNameCustoUseCaseResponse> {
    const custo = await this.custoRepository.findByName(name)

    if (!custo) {
      return left(new ResourceNotFoundError())
    }

    return right({ custo })
  }
}
