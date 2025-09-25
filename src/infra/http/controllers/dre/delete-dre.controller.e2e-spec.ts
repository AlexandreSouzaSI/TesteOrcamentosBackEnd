import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { DreFactory } from '@test/factories/make-dre'
import { AppModule } from 'src/infra/app.module'
import { DatabaseModule } from 'src/infra/database/prisma/database.module'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'

describe('Delete dre (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let dreFactory: DreFactory
  let userFactory: UserFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, DreFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    dreFactory = moduleRef.get(DreFactory)
    userFactory = moduleRef.get(UserFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[DELETE] /dre/:id', async () => {
    const dre = await dreFactory.makePrismaDre()
    const user = await userFactory.makePrismaUser()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .delete(`/dre/${dre.id}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(204)

    const dreOnDatabase = await prisma.user.findUnique({
      where: {
        id: dre.id.toString(),
      },
    })

    expect(dreOnDatabase).toBeNull()
  })
})
