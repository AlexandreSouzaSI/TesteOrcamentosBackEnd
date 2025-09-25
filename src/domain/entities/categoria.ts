import { Entity } from '../../core/entities/entity'
import { UniqueEntityId } from '../../core/entities/unique-entity-id'
import { Dre } from './dre'

export interface CategoriaProps {
  name: string
  produto?: string | null
  dre?: Dre | null
}

export class Categoria extends Entity<CategoriaProps> {
  get name() {
    return this.props.name
  }

  get produto() {
    return this.props.produto ?? null
  }

  get dre() {
    return this.props.dre ?? null
  }

  set name(name: string) {
    this.props.name = name
  }

  set produto(produto: string | null) {
    this.props.produto = produto
  }

  set dre(dre: Dre | null) {
    this.props.dre = dre
  }

  static create(props: CategoriaProps, id?: UniqueEntityId) {
    const categoria = new Categoria(
      {
        ...props,
      },
      id,
    )

    return categoria
  }
}
