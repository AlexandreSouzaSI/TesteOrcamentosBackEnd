import { Dre } from '@src/domain/entities/dre'
import { DreRepository } from '@src/domain/repositories/dre-repository'

export class InMemoryDreRepository implements DreRepository {
  public items: Dre[] = []

  async create(dre: Dre) {
    this.items.push(dre)
  }

  async findMany() {
    return this.items
  }

  async findById(id: string) {
    const dre = this.items.find((item) => item.id.toString() === id)

    if (!dre) {
      return null
    }

    return dre
  }

  async findByName(name: string) {
    const dre = this.items.find((item) => item.name === name)

    if (!dre) {
      return null
    }

    return dre
  }

  async save(dre: Dre) {
    const itemIndex = this.items.findIndex((item) => item.id === dre.id)

    this.items[itemIndex] = dre
  }

  async delete(dre: Dre) {
    const itemIndex = this.items.findIndex((item) => item.id === dre.id)

    this.items.splice(itemIndex, 1)
  }
}
