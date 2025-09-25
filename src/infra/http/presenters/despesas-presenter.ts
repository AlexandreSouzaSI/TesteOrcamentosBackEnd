import { Despesas } from 'src/domain/entities/despesas'

export class DespesasPresenter {
  static toHTTP(despesa: Despesas) {
    return {
      id: despesa.id.toString(),
      name: despesa.name,
      data: despesa.data,
      valor: despesa.valor,
      status: despesa.status,
      dataVencimento: despesa.dataVencimento,
      quantidade: despesa.quantidade,
      valorUnitario: despesa.valorUnitario,
      createdAt: despesa.createdAt,
      updatedAt: despesa.updatedAt,
      userId: despesa.userId.toString(),
      categoria: despesa.categoria,
      produtoId: despesa.produtoId,
    }
  }
}
