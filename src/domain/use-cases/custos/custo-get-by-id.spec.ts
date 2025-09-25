import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { InMemoryCustoRepository } from '@test/repositories/in-memory-custo-repository'
import { makeCusto } from '@test/factories/make-custo'
import { GetByIdCustoUseCase } from './custo-get-by-id-use-case'

let inMemoryCustoRepository: InMemoryCustoRepository
let sut: GetByIdCustoUseCase

describe('Get by id Custo', () => {
  beforeEach(() => {
    inMemoryCustoRepository = new InMemoryCustoRepository()
    sut = new GetByIdCustoUseCase(inMemoryCustoRepository)
  })

  it('should be able to get by id a Custo', async () => {
    await inMemoryCustoRepository.create(
      makeCusto({}, new UniqueEntityId('custo-1')),
    )

    const custo = await sut.execute({
      custoId: 'custo-1',
    })

    expect(custo.isRight()).toBe(true)
  })
})
