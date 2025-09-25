import { Custo } from '@src/domain/entities/custo'

export class CustoPresenter {
  static toHTTP(custo: Custo) {
    return {
      id: custo.id.toString(),
      name: custo.name,
      descricao: custo.descricao,
      categoriaId: custo.categoriaId,
      categoria: custo.categoria,
    }
  }

  static formatResponse(custo: Custo | Custo[]) {
    if (Array.isArray(custo)) {
      return custo.map((custo) => this.toHTTP(custo))
    } else {
      return this.toHTTP(custo)
    }
  }
}
