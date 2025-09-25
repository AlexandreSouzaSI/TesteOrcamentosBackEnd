import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from '../../../app.module'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'

describe('Create Custo (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /custos', async () => {
    const response = await request(app.getHttpServer()).post('/custos').send({
      name: 'Spaten',
      descricao: 'Custo',
    })

    expect(response.statusCode).toBe(201)

    const custoOnDatabase = await prisma.custo.findFirst({
      where: {
        name: 'Spaten',
      },
    })

    expect(custoOnDatabase).toBeTruthy()
  })
})
