import { Injectable } from '@nestjs/common'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { Either, left, right } from 'src/core/either'
import { DreRepository } from '@src/domain/repositories/dre-repository'
import { Dre } from '@src/domain/entities/dre'

interface CreateDreUseCaseRequest {
  name: string
  descricao?: string | null
  categoriaId?: string | null
}

type CreateDreUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    dre: Dre
  }
>

@Injectable()
export class CreateDreUseCase {
  constructor(private dreRepository: DreRepository) {}

  async execute({
    name,
    descricao,
    categoriaId,
  }: CreateDreUseCaseRequest): Promise<CreateDreUseCaseResponse> {
    const DreWithSameName = await this.dreRepository.findByName(name)

    if (DreWithSameName) {
      return left(new UserAlreadyExistsError(name))
    }

    const dre = Dre.create({
      name,
      descricao,
      categoriaId,
    })

    await this.dreRepository.create(dre)

    return right({
      dre,
    })
  }
}
