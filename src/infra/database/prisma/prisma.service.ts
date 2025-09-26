import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['warn', 'error', 'info'], // Adicione 'info' para ver conexão nos logs
    })
  }

  async onModuleInit() {
    await this.$connect()
    console.log('PrismaClient successfully connected to database')
  }

  async onModuleDestroy() {
    await this.$disconnect()
    console.log('PrismaClient disconnected from database')
  }
}
