import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from './env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(EnvService)

  const port = configService.get('PORT') || 3000
  const origin = 'teste-orcamento-front-end-vq9n-l7u7pvp3u.vercel.app'

  app.enableCors({
    origin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })

  await app.listen(port)
  console.log(`App listening on port ${port} with frontend ${origin}`)
}
bootstrap()

