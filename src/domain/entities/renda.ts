import { Entity } from '../../core/entities/entity'
import { UniqueEntityId } from '../../core/entities/unique-entity-id'
import { Optional } from '../../core/types/optional'

export interface RendaProps {
  name: string
  data?: string | null
  valor: number
  status: string
  createdAt: Date
  updatedAt?: Date | null
  userId: UniqueEntityId
}

export class Renda extends Entity<RendaProps> {
  get userId() {
    return this.props.userId
  }

  get name() {
    return this.props.name
  }

  get data() {
    return this.props.data ?? null
  }

  get valor() {
    return this.props.valor
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get status() {
    return this.props.status
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set userId(userId: UniqueEntityId) {
    this.props.userId = userId
    this.touch()
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  set data(data: string | null) {
    this.props.data = data
    this.touch()
  }

  set valor(valor: number) {
    this.props.valor = valor
    this.touch()
  }

  set status(status: string) {
    this.props.status = status
    this.touch()
  }

  static create(
    props: Optional<RendaProps, 'createdAt' | 'data' | 'status'>,
    id?: UniqueEntityId,
  ) {
    const renda = new Renda(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        status: props.status ? props.status : 'pendente',
        data: props.data ?? null,
      },
      id,
    )

    return renda
  }
}
