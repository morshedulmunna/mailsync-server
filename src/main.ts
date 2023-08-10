import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS for specific origins
  app.enableCors({
    origin: ['https://mailsyncs.vercel.app/', 'http://localhost:3000/'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable sending cookies and other credentials
  });
  app.setGlobalPrefix('/api/v1');
  await app.listen(5000);
}
bootstrap();
