import { Dre } from '@src/domain/entities/dre'

export class DrePresenter {
  static toHTTP(dre: Dre) {
    return {
      id: dre.id.toString(),
      name: dre.name,
      descricao: dre.descricao,
      categoriaId: dre.categoriaId,
    }
  }

  static formatResponse(dre: Dre[]) {
    return dre.map(DrePresenter.toHTTP)
  }
}
