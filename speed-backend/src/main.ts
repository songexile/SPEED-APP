import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';

async function bootstrap() {
  ConfigModule.forRoot() // Load environment variables
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: ['http://localhost:3000', 'https://next-gen.miguelemmara.me'], // Add all allowed origins here
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  await app.listen(process.env.PORT, () => console.log(`\nApp listen at http://localhost:${process.env.PORT}/`));
}
bootstrap();
