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
import { Public } from 'src/infra/auth/public'
import { ProdutoAlreadyExistsError } from '@src/domain/use-cases/errors/produto-already-exists-error copy'
import { CreateCustoUseCase } from '@src/domain/use-cases/custos/custo-create-use-case'

const createCustoBodySchema = z.object({
  name: z.string(),
  descricao: z.string().optional(),
  categoriaId: z.string().optional(),
})

type CreateCustoBodySchema = z.infer<typeof createCustoBodySchema>

@Controller('/custos')
@Public()
export class CreateCustoController {
  constructor(private createCusto: CreateCustoUseCase) { }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createCustoBodySchema))
  async handle(@Body() body: CreateCustoBodySchema) {
    console.log("aqui: ", body)
    const { name, descricao, categoriaId } = body

    const result = await this.createCusto.execute({
      name,
      descricao,
      categoriaId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ProdutoAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
