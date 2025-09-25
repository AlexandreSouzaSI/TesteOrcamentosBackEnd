import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { DreFactory } from '@test/factories/make-dre'
import { UserFactory } from '@test/factories/make-user'
import { AppModule } from 'src/infra/app.module'
import { DatabaseModule } from 'src/infra/database/prisma/database.module'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import request from 'supertest'

describe('Edit dre (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let dreFactory: DreFactory
  let userFactory: UserFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [DreFactory, UserFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    dreFactory = moduleRef.get(DreFactory)
    userFactory = moduleRef.get(UserFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PUT] /dreEdit/:id', async () => {
    const dre = await dreFactory.makePrismaDre({
      name: 'Sorvete',
      descricao: 'sim',
      categoriaId: '11928193',
    })

    const user = await userFactory.makePrismaUser()

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .put(`/dreEdit/${dre.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Sorvete atualizado',
        descricao: 'false',
      })

    expect(response.statusCode).toBe(204)

    // Verifica a atualização no banco de dados
    const dreOnDatabase = await prisma.dre.findUnique({
      where: { id: dre.id.toString() },
    })

    expect(dreOnDatabase).toBeTruthy()
    expect(dreOnDatabase).toEqual(
      expect.objectContaining({
        name: 'Sorvete atualizado',
        produto: 'false',
      }),
    )
  })
})
