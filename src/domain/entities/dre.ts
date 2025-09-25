import { Entity } from '../../core/entities/entity'
import { UniqueEntityId } from '../../core/entities/unique-entity-id'

export interface DreProps {
  name: string
  descricao?: string | null
  categoriaId?: string | null
}

export class Dre extends Entity<DreProps> {
  get name() {
    return this.props.name
  }

  get descricao() {
    return this.props.descricao ?? null
  }

  get categoriaId() {
    return this.props.categoriaId ?? null
  }

  set name(name: string) {
    this.props.name = name
  }

  set descricao(descricao: string | null) {
    this.props.descricao = descricao
  }

  set categoriaId(categoriaId: string | null) {
    this.props.categoriaId = categoriaId
  }

  static create(props: DreProps, id?: UniqueEntityId) {
    const dre = new Dre(
      {
        ...props,
      },
      id,
    )

    return dre
  }
}
