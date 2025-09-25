import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { InMemoryCustoRepository } from '@test/repositories/in-memory-custo-repository'
import { GetByNameCustoUseCase } from './custo-get-by-name-use-case'
import { makeCusto } from '@test/factories/make-custo'

let inMemoryCustoRepository: InMemoryCustoRepository
let sut: GetByNameCustoUseCase

describe('Get by name Custo', () => {
  beforeEach(() => {
    inMemoryCustoRepository = new InMemoryCustoRepository()
    sut = new GetByNameCustoUseCase(inMemoryCustoRepository)
  })

  it('should be able to get by name Custo', async () => {
    await inMemoryCustoRepository.create(
      makeCusto(
        {
          name: 'custo',
        },
        new UniqueEntityId('custo-1'),
      ),
    )

    const custo = await sut.execute({
      name: 'custo',
    })

    expect(custo.isRight()).toBe(true)
  })
})
