import { CreateCustoUseCase } from './custo-create-use-case'
import { InMemoryCustoRepository } from '@test/repositories/in-memory-custo-repository'

let inMemoryCustoRepository: InMemoryCustoRepository
let sut: CreateCustoUseCase

describe('create a Custo', () => {
  beforeEach(() => {
    inMemoryCustoRepository = new InMemoryCustoRepository()
    sut = new CreateCustoUseCase(inMemoryCustoRepository)
  })

  it('should be able to create a Custo', async () => {
    const result = await sut.execute({
      name: 'Alexandre',
      descricao: 'Custo Teste',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      custo: inMemoryCustoRepository.items[0],
    })
  })
})
