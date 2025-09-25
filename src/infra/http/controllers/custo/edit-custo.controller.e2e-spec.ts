import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { CustoFactory } from '@test/factories/make-custo'
import { UserFactory } from '@test/factories/make-user'
import { AppModule } from 'src/infra/app.module'
import { DatabaseModule } from 'src/infra/database/prisma/database.module'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import request from 'supertest'

describe('Edit custo (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let custoFactory: CustoFactory
  let userFactory: UserFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [CustoFactory, UserFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    custoFactory = moduleRef.get(CustoFactory)
    userFactory = moduleRef.get(UserFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PUT] /custos/:id', async () => {
    const custo = await custoFactory.makePrismaCusto({
      name: 'Spaten',
    })

    const user = await userFactory.makePrismaUser()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .put(`/custos/${custo.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Spaten atualizado',
      })

    expect(response.statusCode).toBe(204)

    const custoOnDatabase = await prisma.custo.findFirst({
      where: {
        name: 'Spaten atualizado',
      },
    })

    expect(custoOnDatabase).toBeTruthy()

    expect(custoOnDatabase).toEqual(
      expect.objectContaining({
        id: custoOnDatabase?.id.toString(),
      }),
    )
  })
})
