import { Injectable } from '@nestjs/common'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { Either, left, right } from 'src/core/either'
import { Categoria } from '@src/domain/entities/categoria'
import { CategoriaRepository } from '@src/domain/repositories/categoria-repository'
import { Dre } from '@src/domain/entities/dre'

interface CreateCategoriaUseCaseRequest {
  name: string
  produto?: string | null
  dre?: Dre | null
}

type CreateCategoriaUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    categoria: Categoria
  }
>

@Injectable()
export class CreateCategoriaUseCase {
  constructor(private categoriaRepository: CategoriaRepository) {}

  async execute({
    name,
    produto,
    dre,
  }: CreateCategoriaUseCaseRequest): Promise<CreateCategoriaUseCaseResponse> {
    const categoriaWithSameName =
      await this.categoriaRepository.findByName(name)

    if (categoriaWithSameName) {
      return left(new UserAlreadyExistsError(name))
    }

    const categoria = Categoria.create({
      name,
      produto,
      dre,
    })

    await this.categoriaRepository.create(categoria)

    return right({
      categoria,
    })
  }
}
