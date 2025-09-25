import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from '../../../app.module'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { DatabaseModule } from '@src/infra/database/prisma/database.module'

describe('Create Dre (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /dre', async () => {
    const response = await request(app.getHttpServer()).post('/dre').send({
      name: 'revenda',
    })

    expect(response.statusCode).toBe(201)

    const dreOnDatabase = await prisma.dre.findFirst({
      where: {
        name: 'revenda',
      },
    })

    expect(dreOnDatabase).toBeTruthy()
  })
})
