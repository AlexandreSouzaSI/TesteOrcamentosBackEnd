import { right } from './../../../core/either'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { DespesasRepository } from '../../repositories/despesas-repository'
import { Either, left } from 'src/core/either'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'
import { Despesas } from 'src/domain/entities/despesas'
import { ProdutoRepository } from '@src/domain/repositories/produto-repository'

interface EditDespesasUseCaseRequest {
  despesaId: string
  name?: string
  data?: string | null
  valor?: number
  status?: string
  dataVencimento?: string | null
  quantidade?: number | null
  valorUnitario?: number | null
  userId: UniqueEntityId
  categoriaId?: string | null
  produtoId?: string | null
  custoId?: string | null
}

type EditDespesasUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    despesa: Despesas
  }
>

@Injectable()
export class EditDespesasUseCase {
  constructor(
    private despesasRepository: DespesasRepository,
    private produtoRepository: ProdutoRepository,
  ) { }

  async execute({
    despesaId,
    name,
    data,
    valor,
    status,
    produtoId,
    dataVencimento,
    quantidade,
    valorUnitario,
    categoriaId,
    custoId
  }: EditDespesasUseCaseRequest): Promise<EditDespesasUseCaseResponse> {
    const despesa = await this.despesasRepository.findById(despesaId)

    if (!despesa) {
      return left(new ResourceNotFoundError())
    }

    if (status) {
      despesa.status = status
    }

    if (name) {
      despesa.name = name
    }

    if (valor) {
      despesa.valor = valor
    }

    if (valorUnitario) {
      despesa.valorUnitario = valorUnitario
    }

    if (dataVencimento) {
      despesa.dataVencimento = dataVencimento
    }

    if (categoriaId) {
      despesa.categoriaId = categoriaId
    }

    if (produtoId) {
      despesa.produtoId = produtoId
    }

    if (custoId) {
      despesa.custoId = custoId
    }

    if (produtoId) {
      const produto = await this.produtoRepository.findById(despesa.produtoId!)

      if (produto) {
        // Armazene a quantidade original
        const quantidadeOriginal = despesa.quantidade ?? 0

        if (quantidade !== null && quantidade !== undefined) {
          const diferencaQuantidade = quantidade - quantidadeOriginal
          produto.quantidadeEstoque =
            (produto.quantidadeEstoque ?? 0) + diferencaQuantidade
          despesa.quantidade = quantidade
          await this.produtoRepository.save(produto)
        }
      }

      despesa.data = data ?? null
    }


    await this.despesasRepository.save(despesa)

    return right({ despesa })
  }
}
