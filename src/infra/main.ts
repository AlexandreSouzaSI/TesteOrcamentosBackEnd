import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from './env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(EnvService)

  const port = configService.get('PORT') || 3000

  app.enableCors({
    origin: (incomingOrigin, callback) => {
      if (!incomingOrigin) return callback(null, true) // permite Postman ou server-side requests
      // permite qualquer subdomínio do Vercel
      if (/\.vercel\.app$/.test(incomingOrigin)) {
        callback(null, true)
      } else {
        callback(new Error(`Origin ${incomingOrigin} not allowed by CORS`))
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })

  await app.listen(port)
  console.log(`App listening on port ${port}`)
}
bootstrap()
