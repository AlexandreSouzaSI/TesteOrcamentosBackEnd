import { InMemoryDreRepository } from '@test/repositories/in-memory-dre-repository'
import { CreateDreUseCase } from './dre-create-use-case'

let inMemoryDreRepository: InMemoryDreRepository
let sut: CreateDreUseCase

describe('create a Dre', () => {
  beforeEach(() => {
    inMemoryDreRepository = new InMemoryDreRepository()
    sut = new CreateDreUseCase(inMemoryDreRepository)
  })

  it('should be able to create a Dre', async () => {
    const result = await sut.execute({
      name: 'Produto para revenda',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      dre: inMemoryDreRepository.items[0],
    })
  })
})
