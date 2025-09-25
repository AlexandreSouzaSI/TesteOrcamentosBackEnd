import { right } from './../../../core/either'
import { Injectable } from '@nestjs/common'
import { Either, left } from 'src/core/either'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from 'src/core/errors/errors/not-allowed-error'
import { DreRepository } from '@src/domain/repositories/dre-repository'
import { Dre } from '@src/domain/entities/dre'

interface EditDreUseCaseRequest {
  id: string
  name?: string
  descricao?: string | null
  categoriaId?: string | null
}

type EditDreUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    dre: Dre
  }
>

@Injectable()
export class EditDreUseCase {
  constructor(private dreRepository: DreRepository) {}

  async execute({
    id,
    name,
    descricao,
    categoriaId,
  }: EditDreUseCaseRequest): Promise<EditDreUseCaseResponse> {
    const dre = await this.dreRepository.findById(id)

    if (!dre) {
      return left(new ResourceNotFoundError())
    }

    if (name) {
      dre.name = name
    }

    if (descricao) {
      dre.descricao = descricao
    }

    if (categoriaId) {
      dre.categoriaId = categoriaId
    }

    await this.dreRepository.save(dre)

    return right({ dre })
  }
}
