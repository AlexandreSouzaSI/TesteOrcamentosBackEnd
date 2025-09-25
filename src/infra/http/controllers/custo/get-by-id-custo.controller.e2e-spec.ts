import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { AppModule } from '../../../app.module'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'
import { DatabaseModule } from 'src/infra/database/prisma/database.module'
import { CustoFactory } from '@test/factories/make-custo'

describe('Fetch custo (E2E)', () => {
  let app: INestApplication
  let jwt: JwtService
  let userFactory: UserFactory
  let custoFactory: CustoFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, CustoFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    jwt = moduleRef.get(JwtService)
    userFactory = moduleRef.get(UserFactory)
    custoFactory = moduleRef.get(CustoFactory)

    await app.init()
  })

  test('[GET] /custos/:id', async () => {
    const user = await userFactory.makePrismaUser({
      name: 'Alexandre Teste',
    })

    const custo = await custoFactory.makePrismaCusto({
      name: 'Salgados',
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .get(`/custos/${custo.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      custo: expect.objectContaining({ name: 'Salgados' }),
    })
  })
})
