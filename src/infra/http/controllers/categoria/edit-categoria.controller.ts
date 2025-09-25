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
import { EditCategoriaUseCase } from '@src/domain/use-cases/categorias/categoria-edit-use-case'

const editCategoriaBodySchema = z.object({
  name: z.string().optional(),
  produto: z.string().optional(),
})

const bodyValidationPipe = new ZodValidationPipe(editCategoriaBodySchema)

type EditCategoriaBodySchema = z.infer<typeof editCategoriaBodySchema>

@Controller('/categoryEdit/:id')
export class EditCategoriaController {
  constructor(private editCategoria: EditCategoriaUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditCategoriaBodySchema,
    @Param('id') categoriaId: string,
  ) {
    console.log('aqui', categoriaId)
    const { name, produto } = body

    console.log('Aqui body: ')

    const result = await this.editCategoria.execute({
      id: categoriaId,
      name,
      produto,
    })

    console.log('result: ', result.value)

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return right({ result })
  }
}
