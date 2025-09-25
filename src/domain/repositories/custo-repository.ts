import { PaginationParams } from '@src/core/repositories/pagination-params'
import { Custo } from '../entities/custo'

export abstract class CustoRepository {
  abstract create(data: Custo): Promise<void>
  abstract findById(custoId: string): Promise<Custo | null>
  abstract findByName(name: string): Promise<Custo | null>
  abstract findMany(
    params: PaginationParams,
    id: string,
    name?: string,
    categoriaId?: string,
  ): Promise<Custo[]>

  abstract save(data: Custo): Promise<void>
  abstract delete(data: Custo): Promise<void>
}
