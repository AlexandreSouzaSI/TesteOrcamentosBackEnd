import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation-pipe'
import { right } from 'src/core/either'
import { EditDreUseCase } from '@src/domain/use-cases/dre/dre-edit-use-case'

const editDreBodySchema = z.object({
  name: z.string().optional(),
  descricao: z.string().optional(),
  categoriaId: z.string().optional(),
})

const bodyValidationPipe = new ZodValidationPipe(editDreBodySchema)

type EditDreBodySchema = z.infer<typeof editDreBodySchema>

@Controller('/dreEdit/:id')
export class EditDreController {
  constructor(private editDre: EditDreUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditDreBodySchema,
    @Param('id') dreId: string,
  ) {
    const { name, descricao, categoriaId } = body

    const result = await this.editDre.execute({
      id: dreId,
      name,
      descricao,
      categoriaId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return right({ result })
  }
}
