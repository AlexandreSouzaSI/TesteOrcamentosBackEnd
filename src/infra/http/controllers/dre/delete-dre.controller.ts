import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { DeleteDreUseCase } from '@src/domain/use-cases/dre/dre-delete-use-case'
import { right } from 'src/core/either'

@Controller('/dre/:id')
export class DeleteDreController {
  constructor(private deleteDre: DeleteDreUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') userId: string) {
    const result = await this.deleteDre.execute({
      id: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return right({ result })
  }
}
