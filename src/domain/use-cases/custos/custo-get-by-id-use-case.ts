import { Custo } from '@src/domain/entities/custo'
import { right } from './../../../core/either'
import { Injectable } from '@nestjs/common'
import { CustoRepository } from '@src/domain/repositories/custo-repository'
import { Either, left } from 'src/core/either'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'

interface GetByIdCustoUseCaseRequest {
  custoId: string
}

type GetByIdCustoUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    custo: Custo
  }
>

@Injectable()
export class GetByIdCustoUseCase {
  constructor(private produtoRepository: CustoRepository) {}

  async execute({
    custoId,
  }: GetByIdCustoUseCaseRequest): Promise<GetByIdCustoUseCaseResponse> {
    const custo = await this.produtoRepository.findById(custoId)

    if (!custo) {
      return left(new ResourceNotFoundError())
    }

    return right({ custo })
  }
}
