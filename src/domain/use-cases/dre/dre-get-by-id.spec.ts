import { InMemoryDreRepository } from '@test/repositories/in-memory-dre-repository'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { GetByIdDreUseCase } from './dre-get-by-id-use-case'
import { makeDre } from '@test/factories/make-dre'

let inMemoryDreRepository: InMemoryDreRepository
let sut: GetByIdDreUseCase

describe('Get by id dre', () => {
  beforeEach(() => {
    inMemoryDreRepository = new InMemoryDreRepository()
    sut = new GetByIdDreUseCase(inMemoryDreRepository)
  })

  it('should be able to get by id dre', async () => {
    await inMemoryDreRepository.create(
      makeDre(
        {
          name: 'dre',
        },
        new UniqueEntityId('dre-1'),
      ),
    )

    const dre = await sut.execute({
      dreId: 'dre-1',
    })

    expect(dre.isRight()).toBe(true)
  })
})
