import { PaginationParams } from '@src/core/repositories/pagination-params'
import { Dre } from '../entities/Dre'

export abstract class DreRepository {
  abstract create(data: Dre): Promise<void>
  abstract findMany(
    params: PaginationParams,
    id?: string,
    name?: string,
  ): Promise<Dre[]>

  abstract findById(dreId: string): Promise<Dre | null>
  abstract findByName(name: string): Promise<Dre | null>
  abstract save(data: Dre): Promise<void>
  abstract delete(data: Dre): Promise<void>
}
