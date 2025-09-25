import { BadRequestException, Body, Controller, Get } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { GetByNameDreUseCase } from '@src/domain/use-cases/dre/dre-get-by-name-use-case'
import { DrePresenter } from '../../presenters/dre-presenter'

const getByNameBoySchema = z.object({
  name: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(getByNameBoySchema)

type GetByNameBoySchema = z.infer<typeof getByNameBoySchema>

@Controller('/dreName/')
export class GetByNameDreController {
  constructor(private getByNameDre: GetByNameDreUseCase) {}

  @Get()
  async handle(@Body(bodyValidationPipe) body: GetByNameBoySchema) {
    const { name } = body
    const dre = await this.getByNameDre.execute({
      name,
    })

    if (!dre) {
      throw new Error()
    }

    if (dre.isLeft()) {
      throw new BadRequestException()
    }

    const dreList = dre.value.dre

    if (!dreList) {
      throw new BadRequestException('Dre not found')
    }

    return { dre: DrePresenter.toHTTP(dreList) }
  }
}
