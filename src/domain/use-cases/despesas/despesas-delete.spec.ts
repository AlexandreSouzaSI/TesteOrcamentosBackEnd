import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { DeleteDespesasUseCase } from './despesas-delete-use-case'
import { makeDespesa } from 'test/factories/make-despesa'
import { InMemoryDespesasRepository } from '@test/repositories/in-memory-despesas-repository'
import { InMemoryProdutoRepository } from '@test/repositories/in-memory-produto-repository'
import { makeProduto } from '@test/factories/make-produto'

let inMemoryDespesasRepository: InMemoryDespesasRepository
let inMemoryProdutoRepository: InMemoryProdutoRepository
let sut: DeleteDespesasUseCase

describe('Delete despesa', () => {
  beforeEach(() => {
    inMemoryDespesasRepository = new InMemoryDespesasRepository()
    inMemoryProdutoRepository = new InMemoryProdutoRepository()
    sut = new DeleteDespesasUseCase(inMemoryDespesasRepository, inMemoryProdutoRepository)
  })

  it('should be able to delete a despesa', async () => {
    const newDespesa = makeDespesa({}, new UniqueEntityId('despesa-1'))
    const newProduto = makeProduto({}, new UniqueEntityId('produto-1'))

    await inMemoryDespesasRepository.create(newDespesa)
    await inMemoryProdutoRepository.create(newProduto)

    await sut.execute({
      despesaId: 'despesa-1',
    })

    expect(inMemoryDespesasRepository.items).toHaveLength(0)
  })
})
