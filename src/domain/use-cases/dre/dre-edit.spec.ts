import { InMemoryDreRepository } from '@test/repositories/in-memory-dre-repository'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'
import { EditDreUseCase } from './dre-edit-use-case'
import { makeDre } from '@test/factories/make-dre'

let inMemoryDreRepository: InMemoryDreRepository
let sut: EditDreUseCase

describe('Edit Dre', () => {
  beforeEach(() => {
    inMemoryDreRepository = new InMemoryDreRepository()
    sut = new EditDreUseCase(inMemoryDreRepository)
  })

  it('should be able to edit a Dre', async () => {
    const newDre = makeDre({}, new UniqueEntityId('dre-1'))

    await inMemoryDreRepository.create(newDre)

    const result = await sut.execute({
      id: 'dre-1',
      name: 'Nome Teste',
    })

    const updatedDre = inMemoryDreRepository.items[0]

    expect(updatedDre).toMatchObject({
      name: 'Nome Teste',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      dre: updatedDre,
    })
  })

  it('should return ResourceNotFoundError if dre does not exist', async () => {
    const result = await sut.execute({
      id: 'non-existent-user',
      name: 'Nome Teste',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
