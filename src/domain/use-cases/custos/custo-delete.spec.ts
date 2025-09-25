import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { makeCusto } from '@test/factories/make-custo'
import { DeleteCustoUseCase } from './custo-delete-use-case'
import { InMemoryCustoRepository } from '@test/repositories/in-memory-custo-repository'

let inMemoryCustoRepository: InMemoryCustoRepository
let sut: DeleteCustoUseCase

describe('Delete Custo', () => {
  beforeEach(() => {
    inMemoryCustoRepository = new InMemoryCustoRepository()
    sut = new DeleteCustoUseCase(inMemoryCustoRepository)
  })

  it('should be able to delete a custo', async () => {
    const newCusto = makeCusto({}, new UniqueEntityId('custo-1'))

    await inMemoryCustoRepository.create(newCusto)

    await sut.execute({
      id: 'custo-1',
    })

    expect(inMemoryCustoRepository.items).toHaveLength(0)
  })
})
