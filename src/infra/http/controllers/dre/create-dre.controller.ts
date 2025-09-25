import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation-pipe'
import { CreateDreUseCase } from '@src/domain/use-cases/dre/dre-create-use-case'
import { DreAlreadyExistsError } from '@src/domain/use-cases/errors/dre-already-exists-error'

const createDreBodySchema = z.object({
  name: z.string(),
  descricao: z.string().optional(),
  categoriaId: z.string().optional(),
})

type CreateDreBodySchema = z.infer<typeof createDreBodySchema>

@Controller('/dre')
export class CreateDreController {
  constructor(private createDre: CreateDreUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createDreBodySchema))
  async handle(@Body() body: CreateDreBodySchema) {
    const { name, descricao, categoriaId } = body

    const result = await this.createDre.execute({
      name,
      descricao,
      categoriaId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case DreAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
