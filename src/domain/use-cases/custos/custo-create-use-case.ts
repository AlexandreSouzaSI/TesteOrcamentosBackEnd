import { Injectable } from '@nestjs/common'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { Either, left, right } from 'src/core/either'
import { CustoRepository } from '@src/domain/repositories/custo-repository'
import { Custo } from '@src/domain/entities/custo'

interface CreateCustoUseCaseRequest {
  name: string
  descricao?: string | null
  categoriaId?: string | null
}

type CreateCustoUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    custo: Custo
  }
>

@Injectable()
export class CreateCustoUseCase {
  constructor(private custoRepository: CustoRepository) {}

  async execute({
    name,
    descricao,
    categoriaId,
  }: CreateCustoUseCaseRequest): Promise<CreateCustoUseCaseResponse> {
    const custoWithSameName = await this.custoRepository.findByName(name)

    if (custoWithSameName) {
      return left(new UserAlreadyExistsError(name))
    }

    const custo = Custo.create({
      name,
      descricao,
      categoriaId,
    })

    await this.custoRepository.create(custo)

    return right({
      custo,
    })
  }
}
