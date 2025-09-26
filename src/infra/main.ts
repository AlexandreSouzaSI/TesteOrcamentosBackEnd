import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from './env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(EnvService)
  const port = configService.get('PORT')

  // Habilita CORS de forma dinâmica
  app.enableCors({
    origin: (incomingOrigin, callback) => {
      // Lista de domínios permitidos
      const allowedOrigins = [
        'https://teste-orcamento-front-end-vq9n.vercel.app',
        'https://seu-dominio-principal.vercel.app',
      ]

      // Se não tiver origin (por exemplo, requisições do Postman) ou estiver na lista, permite
      if (!incomingOrigin || allowedOrigins.includes(incomingOrigin)) {
        callback(null, true)
      } else {
        callback(new Error(`Origin ${incomingOrigin} not allowed by CORS`))
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })

  console.log(`App listening on port ${port}`)
  await app.listen(port)
}
bootstrap()
