import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { EditProdutoUseCase } from '@src/domain/use-cases/produtos/produto-edit-use-case'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { CreateDespesasUseCase } from 'src/domain/use-cases/despesas/despesas-create-use-case'
import { CurrentUser } from 'src/infra/auth/current-user-decorator'
import { UserPayload } from 'src/infra/auth/jwt.strategy'
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'

const createDespesasBodySchema = z.object({
  name: z.string(),
  data: z.string().optional(),
  valor: z.coerce.number().optional(),
  quantidade: z.coerce.number().optional(),
  valorUnitario: z.coerce.number().optional(),
  categoriaId: z.string().optional(),
  dataVencimento: z.string().optional(),
  status: z.string().optional(),
  produtoId: z.string().optional(),
  custoId: z.string().optional(),
})

const bodyValidationPipe = new ZodValidationPipe(createDespesasBodySchema)

type CreateDespesasBodySchema = z.infer<typeof createDespesasBodySchema>

@Controller('/despesa')
export class CreateDespesasController {
  constructor(
    private createDespesas: CreateDespesasUseCase,
    private editProduto: EditProdutoUseCase,
  ) { }

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateDespesasBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const {
      name,
      data,
      valor,
      dataVencimento,
      status,
      quantidade,
      valorUnitario,
      categoriaId,
      produtoId,
      custoId,
    } = body

    const userValidate = user.sub

    const result = await this.createDespesas.execute({
      userId: new UniqueEntityId(userValidate),
      name,
      valor,
      status,
      quantidade,
      valorUnitario,
      data,
      categoriaId,
      dataVencimento,
      produtoId,
      custoId,
    })

    if (produtoId && produtoId !== '') {
      const quantidadeAtualizada = quantidade ?? 0

      await this.editProduto.execute({
        id: produtoId,
        quantidadeEstoque: quantidadeAtualizada,
        categoriaId,
        name,
        isDirectUpdate: true,
      })
    }

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
