import { right } from './../../../core/either'
import { Injectable } from '@nestjs/common'
import { Either, left } from 'src/core/either'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from 'src/core/errors/errors/not-allowed-error'
import { Categoria } from '@src/domain/entities/categoria'
import { CategoriaRepository } from '@src/domain/repositories/categoria-repository'
import { Dre } from '@src/domain/entities/dre'

interface EditCategoriaUseCaseRequest {
  id: string
  name?: string
  produto?: string
  dre?: Dre
}

type EditCategoriaUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    categoria: Categoria
  }
>

@Injectable()
export class EditCategoriaUseCase {
  constructor(private categoriaRepository: CategoriaRepository) {}

  async execute({
    id,
    name,
    produto,
    dre,
  }: EditCategoriaUseCaseRequest): Promise<EditCategoriaUseCaseResponse> {
    const categoria = await this.categoriaRepository.findById(id)

    if (!categoria) {
      return left(new ResourceNotFoundError())
    }

    if (name) {
      categoria.name = name
    }

    if (dre) {
      categoria.dre = dre
    }

    if (produto) {
      categoria.produto = produto
    }

    await this.categoriaRepository.save(categoria)

    return right({ categoria })
  }
}
