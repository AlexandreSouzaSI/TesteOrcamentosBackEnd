import Decimal from 'decimal.js'
import { DespesasRepository } from 'src/domain/repositories/despesas-repository'
import { PaginationParams } from 'src/core/repositories/pagination-params'
import { Despesas } from '@src/domain/entities/despesas'

export class InMemoryDespesasRepository implements DespesasRepository {
  public items: Despesas[] = []

  async create(despesa: Despesas) {
    this.items.push(despesa)
  }

  async findById(id: string) {
    const despesa = this.items.find((item) => item.id.toString() === id)

    if (!despesa) {
      return null
    }

    return despesa
  }

  async findCount(id: string) {
    const despesa = this.items.filter(
      (item) => item.userId.toString() === id,
    ).length

    if (!despesa) {
      return null
    }

    return despesa
  }

  async findManyRecent({ pageIndex }: PaginationParams, id: string) {
    const filteredDespesas = this.items.filter(
      (item) => item.userId.toString() === id,
    )

    const despesa = filteredDespesas
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((pageIndex - 1) * 10, pageIndex * 10)

    return despesa
  }

  async sumDespesaValues(userId: string, status?: string): Promise<number> {
    let despesas = this.items.filter(
      (item) => item.userId.toString() === userId,
    )

    if (status) {
      despesas = despesas.filter((item) => item.status === status)
    }

    const totalSum = despesas.reduce((sum, despesa) => {
      return new Decimal(sum).add(despesa.valor).toNumber()
    }, 0)

    return totalSum
  }

  async save(despesa: Despesas) {
    const itemIndex = this.items.findIndex((item) => item.id === despesa.id)

    this.items[itemIndex] = despesa
  }

  async delete(despesa: Despesas) {
    const itemIndex = this.items.findIndex((item) => item.id === despesa.id)

    this.items.splice(itemIndex, 1)
  }
}
