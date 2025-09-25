/* import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { InMemoryDreRepository } from '@test/repositories/in-memory-dre-repository'
import { FetchDreUseCase } from './dre-fetch-use-case'
import { makeDre } from '@test/factories/make-dre'

let inMemoryDreRepository: InMemoryDreRepository
let sut: FetchDreUseCase

describe('Fetch a dre', () => {
  beforeEach(() => {
    inMemoryDreRepository = new InMemoryDreRepository()
    sut = new FetchDreUseCase(inMemoryDreRepository)
  })

  it('should be able to fetch a dre', async () => {
    await inMemoryDreRepository.create(makeDre({}, new UniqueEntityId('dre-1')))

    const dre = await sut.execute({
      id: 'dre-1',
    })

    expect(categoria.isRight()).toBe(true)
  })
})
 */
