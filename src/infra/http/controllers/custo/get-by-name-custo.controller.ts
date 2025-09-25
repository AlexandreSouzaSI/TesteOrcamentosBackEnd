import { BadRequestException, Body, Controller, Get } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { GetByNameCustoUseCase } from '@src/domain/use-cases/custos/custo-get-by-name-use-case'
import { CustoPresenter } from '../../presenters/custo-presenter'

const getByNameBoySchema = z.object({
  name: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(getByNameBoySchema)

type GetByNameBoySchema = z.infer<typeof getByNameBoySchema>

@Controller('/custosName/')
export class GetByNameCustoController {
  constructor(private getByNameCusto: GetByNameCustoUseCase) {}

  @Get()
  async handle(@Body(bodyValidationPipe) body: GetByNameBoySchema) {
    const { name } = body
    const custo = await this.getByNameCusto.execute({
      name,
    })

    if (!custo) {
      throw new Error()
    }

    if (custo.isLeft()) {
      throw new BadRequestException()
    }

    const custosList = custo.value.custo

    if (!custosList) {
      throw new BadRequestException('Custo not found')
    }

    return { custo: CustoPresenter.toHTTP(custosList) }
  }
}
