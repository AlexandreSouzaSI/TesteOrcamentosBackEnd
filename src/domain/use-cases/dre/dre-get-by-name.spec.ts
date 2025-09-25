import { InMemoryDreRepository } from '@test/repositories/in-memory-dre-repository'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { GetByNameDreUseCase } from './dre-get-by-name-use-case'
import { makeDre } from '@test/factories/make-dre'

let inMemoryDreRepository: InMemoryDreRepository
let sut: GetByNameDreUseCase

describe('Get by name dre', () => {
  beforeEach(() => {
    inMemoryDreRepository = new InMemoryDreRepository()
    sut = new GetByNameDreUseCase(inMemoryDreRepository)
  })

  it('should be able to get by name dre', async () => {
    await inMemoryDreRepository.create(
      makeDre(
        {
          name: 'dre',
        },
        new UniqueEntityId('dre-1'),
      ),
    )

    const dre = await sut.execute({
      name: 'dre',
    })

    expect(dre.isRight()).toBe(true)
  })
})
