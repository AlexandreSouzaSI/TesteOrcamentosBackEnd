import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { GetByIdDreUseCase } from '@src/domain/use-cases/dre/dre-get-by-id-use-case'
import { DrePresenter } from '../../presenters/dre-presenter'

@Controller('/dre/:id')
export class GetByIdDreController {
  constructor(private getByIdDre: GetByIdDreUseCase) {}

  @Get()
  async handle(@Param('id') dreId: string) {
    const dre = await this.getByIdDre.execute({
      dreId,
    })

    if (!dre) {
      throw new Error()
    }

    if (dre.isLeft()) {
      throw new BadRequestException()
    }

    const dreList = dre.value.dre

    if (!dreList) {
      throw new BadRequestException('Dre not found')
    }

    return { dre: DrePresenter.toHTTP(dreList) }
  }
}
