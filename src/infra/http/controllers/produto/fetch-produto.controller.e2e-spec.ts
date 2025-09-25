import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from '../../../app.module'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'
import { DatabaseModule } from 'src/infra/database/prisma/database.module'
import { ProdutoFactory } from '@test/factories/make-produto'
import { JwtService } from '@nestjs/jwt'

describe('Fetch produto (E2E)', () => {
  let app: INestApplication
  let jwt: JwtService
  let userFactory: UserFactory
  let produtoFactory: ProdutoFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, ProdutoFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    jwt = moduleRef.get(JwtService)
    userFactory = moduleRef.get(UserFactory)
    produtoFactory = moduleRef.get(ProdutoFactory)

    await app.init()
  })

  test('[GET] /produtos', async () => {
    const user = await userFactory.makePrismaUser({
      name: 'Alexandre Teste',
    })

    await produtoFactory.makePrismaProduto({
      name: 'Salgados',
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .get(`/produtos`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      value: {
        meta: expect.objectContaining({
          pageIndex: expect.any(Number),
          perPage: expect.any(Number),
          totalCount: expect.any(Number),
        }),
        produto: expect.arrayContaining([
          expect.objectContaining({
            name: 'Salgados',
          }),
        ]),
      },
    })
  })
})
