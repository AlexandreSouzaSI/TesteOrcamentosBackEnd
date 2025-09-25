import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { InMemoryCustoRepository } from '@test/repositories/in-memory-custo-repository'
import { FetchCustoUseCase } from './custo-fetch-use-case'
import { makeCusto } from '@test/factories/make-custo'

let inMemoryCustoRepository: InMemoryCustoRepository
let sut: FetchCustoUseCase

describe('Fetch a Custo', () => {
  beforeEach(() => {
    inMemoryCustoRepository = new InMemoryCustoRepository()
    sut = new FetchCustoUseCase(inMemoryCustoRepository)
  })

  it('should be able to fetch a Custo', async () => {
    await inMemoryCustoRepository.create(
      makeCusto({}, new UniqueEntityId('custo-1')),
    )

    const produto = await sut.execute({
      pageIndex: 0,
      name: '',
      categoriaId: '',
    })

    expect(produto.isRight()).toBe(true)
  })
})
