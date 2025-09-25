import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { right } from '@src/core/either'
import { FetchCustoUseCase } from '@src/domain/use-cases/custos/custo-fetch-use-case'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const nameQueryParamSchema = z.string().optional()
const categoriaIdQueryParamSchema = z.string().optional()

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>
type NameQueryParamSchema = z.infer<typeof nameQueryParamSchema>
type CategoriaQueryParamSchema = z.infer<typeof categoriaIdQueryParamSchema>

@Controller('/custos')
export class FetchCustoController {
  constructor(private fetchCusto: FetchCustoUseCase) {}

  @Get()
  async handle(
    @Query('pageIndex', queryValidationPipe)
    pageIndex: PageQueryParamSchema,
    @Query('name') name: NameQueryParamSchema,
    @Query('categoriaId') categoriaId: CategoriaQueryParamSchema,
  ) {
    const result = await this.fetchCusto.execute({
      pageIndex,
      categoriaId,
      name,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const custos = result.value.custo

    const totalCount = result.value.custo.length

    return right({
      custo: custos.map((r) => ({
        id: r.id.toString(),
        name: r.name,
        descricao: r.descricao,
        categoriaId: r.categoriaId,
        categoria: r.categoria?.name,
      })),
      meta: {
        pageIndex,
        perPage: 10,
        totalCount,
      },
    })
  }
}
