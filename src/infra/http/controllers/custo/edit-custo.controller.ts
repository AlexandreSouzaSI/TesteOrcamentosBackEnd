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
import { EditCustoUseCase } from '@src/domain/use-cases/custos/custo-edit-use-case'

const editCustoBodySchema = z.object({
  name: z.string().optional(),
  descricao: z.string().optional(),
  categoriaId: z.string().optional(),
})

const bodyValidationPipe = new ZodValidationPipe(editCustoBodySchema)

type EditCustoBodySchema = z.infer<typeof editCustoBodySchema>

@Controller('/custos/:id')
export class EditCustoController {
  constructor(private editCusto: EditCustoUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditCustoBodySchema,
    @Param('id') custoId: string,
  ) {
    const { name, descricao, categoriaId } = body

    const result = await this.editCusto.execute({
      id: custoId,
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
