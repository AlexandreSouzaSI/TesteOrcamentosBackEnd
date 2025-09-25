import { Custo } from '@src/domain/entities/custo'
import { CustoRepository } from '@src/domain/repositories/custo-repository'

export class InMemoryCustoRepository implements CustoRepository {
  public items: Custo[] = []

  async create(custo: Custo) {
    this.items.push(custo)
  }

  async findById(id: string) {
    const custo = this.items.find((item) => item.id.toString() === id)

    if (!custo) {
      return null
    }

    return custo
  }

  async findByName(name: string) {
    const custo = this.items.find((item) => item.name === name)

    if (!custo) {
      return null
    }

    return custo
  }

  async findMany() {
    return this.items
  }

  async save(custo: Custo) {
    const itemIndex = this.items.findIndex((item) => item.id === custo.id)

    this.items[itemIndex] = custo
  }

  async delete(custo: Custo) {
    const itemIndex = this.items.findIndex((item) => item.id === custo.id)

    this.items.splice(itemIndex, 1)
  }
}
