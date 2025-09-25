import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'
import { InMemoryCustoRepository } from '@test/repositories/in-memory-custo-repository'
import { EditCustoUseCase } from './custo-edit-use-case'
import { makeCusto } from '@test/factories/make-custo'

let inMemoryCustoRepository: InMemoryCustoRepository
let sut: EditCustoUseCase

describe('Edit Custo', () => {
  beforeEach(() => {
    inMemoryCustoRepository = new InMemoryCustoRepository()
    sut = new EditCustoUseCase(inMemoryCustoRepository)
  })

  it('should be able to edit a custo', async () => {
    const newCusto = makeCusto({}, new UniqueEntityId('custo-1'))

    await inMemoryCustoRepository.create(newCusto)

    const result = await sut.execute({
      id: 'custo-1',
      name: 'Nome Teste',
    })

    const updatedCusto = inMemoryCustoRepository.items[0]

    expect(updatedCusto).toMatchObject({
      name: 'Nome Teste',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      custo: updatedCusto,
    })
  })

  it('should return ResourceNotFoundError if custo does not exist', async () => {
    const result = await sut.execute({
      id: 'non-existent-user',
      name: 'Nome Teste',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
