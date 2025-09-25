import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { GetByIdCustoUseCase } from '@src/domain/use-cases/custos/custo-get-by-id-use-case'
import { CustoPresenter } from '../../presenters/custo-presenter'

@Controller('/custos/:id')
export class GetByIdCustoController {
  constructor(private fetchCusto: GetByIdCustoUseCase) {}

  @Get()
  async handle(@Param('id') custoId: string) {
    const custo = await this.fetchCusto.execute({
      custoId,
    })

    if (!custo) {
      throw new Error()
    }

    if (custo.isLeft()) {
      throw new BadRequestException()
    }

    const custoList = custo.value.custo

    if (!custoList) {
      throw new BadRequestException('Custo not found')
    }

    return { custo: CustoPresenter.toHTTP(custoList) }
  }
}
