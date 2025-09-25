import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { AppModule } from '../../../app.module'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'
import { DatabaseModule } from 'src/infra/database/prisma/database.module'
import { DreFactory } from '@test/factories/make-dre'

describe('Fetch dre (E2E)', () => {
  let app: INestApplication
  let jwt: JwtService
  let userFactory: UserFactory
  let dreFactory: DreFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, DreFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    jwt = moduleRef.get(JwtService)
    userFactory = moduleRef.get(UserFactory)
    dreFactory = moduleRef.get(DreFactory)

    await app.init()
  })

  test('[GET] /dre/:id', async () => {
    const user = await userFactory.makePrismaUser({
      name: 'Alexandre Teste',
    })

    const dre = await dreFactory.makePrismaDre({
      name: 'Salgados',
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .get(`/dre/${dre.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      categoria: expect.objectContaining({ name: 'Salgados' }),
    })
  })
})
