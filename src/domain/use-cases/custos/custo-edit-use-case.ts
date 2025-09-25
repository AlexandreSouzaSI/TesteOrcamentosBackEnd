import { right } from './../../../core/either'
import { Injectable } from '@nestjs/common'
import { Either, left } from 'src/core/either'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from 'src/core/errors/errors/not-allowed-error'
import { Custo } from '@src/domain/entities/custo'
import { CustoRepository } from '@src/domain/repositories/custo-repository'

interface EditCustoUseCaseRequest {
  id: string
  name?: string
  descricao?: string
  categoriaId?: string
}

type EditCustoUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    custo: Custo
  }
>

@Injectable()
export class EditCustoUseCase {
  constructor(private custoRepository: CustoRepository) {}

  async execute({
    id,
    name,
    descricao,
    categoriaId,
  }: EditCustoUseCaseRequest): Promise<EditCustoUseCaseResponse> {
    const custo = await this.custoRepository.findById(id)

    if (!custo) {
      return left(new ResourceNotFoundError())
    }

    if (name) {
      custo.name = name
    }

    if (descricao) {
      custo.descricao = descricao
    }

    if (categoriaId) {
      custo.categoriaId = categoriaId
    }

    await this.custoRepository.save(custo)

    return right({ custo })
  }
}
