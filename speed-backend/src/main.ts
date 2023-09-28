import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';

async function bootstrap() {
  ConfigModule.forRoot() // Load environment variables
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT, () => console.log(`\nApp listen at http://localhost:${process.env.PORT}/`));
}
bootstrap();
