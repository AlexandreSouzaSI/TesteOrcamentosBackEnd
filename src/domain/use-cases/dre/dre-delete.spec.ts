import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { InMemoryDreRepository } from '@test/repositories/in-memory-dre-repository'
import { DeleteDreUseCase } from './dre-delete-use-case'
import { makeDre } from '@test/factories/make-dre'

let inMemoryDreRepository: InMemoryDreRepository
let sut: DeleteDreUseCase

describe('Delete dre', () => {
  beforeEach(() => {
    inMemoryDreRepository = new InMemoryDreRepository()
    sut = new DeleteDreUseCase(inMemoryDreRepository)
  })

  it('should be able to delete a dre', async () => {
    const newDre = makeDre({}, new UniqueEntityId('dre-1'))

    await inMemoryDreRepository.create(newDre)

    await sut.execute({
      id: 'dre-1',
    })

    expect(inMemoryDreRepository.items).toHaveLength(0)
  })
})
