import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Включение CORS
  app.enableCors({
    origin: '*', // URL вашего React приложения
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
  });
  await app.listen(process.env.PORT ?? 3000);
  console.log('server listen on port:', process.env.PORT ?? 3000);
}
bootstrap();
