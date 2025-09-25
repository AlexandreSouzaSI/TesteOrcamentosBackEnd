import { right } from './../../../core/either'
import { Injectable } from '@nestjs/common'
import { DespesasRepository } from '../../repositories/despesas-repository'
import { Either, left } from 'src/core/either'
import { Despesas } from 'src/domain/entities/despesas'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'
import { ProdutoRepository } from '@src/domain/repositories/produto-repository'

interface DeleteDespesasUseCaseRequest {
  despesaId: string
}

type DeleteDespesasUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    despesa: Despesas
  }
>

@Injectable()
export class DeleteDespesasUseCase {
  constructor(
    private despesaRepository: DespesasRepository,
    private produtoRepository: ProdutoRepository,
  ) {}

  async execute({
    despesaId,
  }: DeleteDespesasUseCaseRequest): Promise<DeleteDespesasUseCaseResponse> {
    const despesa = await this.despesaRepository.findById(despesaId)

    if (!despesa) {
      return left(new ResourceNotFoundError())
    }

    const produto = await this.produtoRepository.findById(despesa.produtoId!)

    if (produto) {
      produto.quantidadeEstoque =
        (produto.quantidadeEstoque ?? 0) - (despesa.quantidade ?? 0)
      await this.produtoRepository.save(produto)
    }

    await this.despesaRepository.delete(despesa)

    return right({ despesa })
  }
}
