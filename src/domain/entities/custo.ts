import { Optional } from '@src/core/types/optional'
import { Entity } from '../../core/entities/entity'
import { UniqueEntityId } from '../../core/entities/unique-entity-id'
import { Categoria } from './categoria'

export interface CustoProps {
  name: string
  descricao?: string | null
  categoriaId?: string | null
  createdAt: Date
  updatedAt?: Date | null
  categoria?: Categoria
}

export class Custo extends Entity<CustoProps> {
  get name() {
    return this.props.name
  }

  get descricao() {
    return this.props.descricao ?? null
  }

  get categoriaId() {
    return this.props.categoriaId ?? null
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get categoria() {
    return this.props.categoria ?? undefined
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  set descricao(descricao: string | null) {
    this.props.descricao = descricao
    this.touch()
  }

  set categoriaId(categoriaId: string | null) {
    this.props.categoriaId = categoriaId
    this.touch()
  }

  set categoria(categoria: Categoria | undefined) {
    this.props.categoria = categoria
    this.touch()
  }

  static create(props: Optional<CustoProps, 'createdAt'>, id?: UniqueEntityId) {
    const custo = new Custo(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        categoria: props.categoria ? props.categoria : undefined,
      },
      id,
    )

    return custo
  }
}
