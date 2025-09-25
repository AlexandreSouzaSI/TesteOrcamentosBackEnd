import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { DeleteCustoUseCase } from '@src/domain/use-cases/custos/custo-delete-use-case'
import { right } from 'src/core/either'

@Controller('/custos/:id')
export class DeleteCustoController {
  constructor(private custoCategoria: DeleteCustoUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') custoId: string) {
    const result = await this.custoCategoria.execute({
      id: custoId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return right({ result })
  }
}
