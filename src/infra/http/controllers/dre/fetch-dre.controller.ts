import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { right } from '@src/core/either'
import { FetchDreUseCase } from '@src/domain/use-cases/dre/dre-fetch-use-case'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const nameQueryParamSchema = z.string().optional()

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>
type NameQueryParamSchema = z.infer<typeof nameQueryParamSchema>

@Controller('/dre')
export class FetchDreController {
  constructor(private fetchDre: FetchDreUseCase) {}

  @Get()
  async handle(
    @Query('pageIndex', queryValidationPipe)
    pageIndex: PageQueryParamSchema,
    @Query('name') name: NameQueryParamSchema,
  ) {
    const result = await this.fetchDre.execute({ pageIndex, name })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const totalCount = result.value.dre.length

    const dre = result.value.dre

    return right({
      categoria: dre.map((r) => ({
        id: r.id.toString(),
        name: r.name,
        descricao: r.descricao,
        categoriaId: r.categoriaId,
      })),
      meta: {
        pageIndex,
        perPage: 10,
        totalCount,
      },
    })
  }
}
