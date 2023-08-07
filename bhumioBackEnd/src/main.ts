import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as multer from 'multer';
import { join } from 'path';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app =
    await NestFactory.create<NestExpressApplication>(
      AppModule,
    );
  app.use(bodyParser.json({ limit: '5mb' }));

  // Enable CORS for all routes
  app.use((req, res, next) => {
    res.setHeader(
      'Access-Control-Allow-Origin',
      '*',
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE',
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
  });
  //Enabling cors
  app.enableCors();
  //
  // Configure multer for file uploads
  app.use(
    multer({
      dest: join(__dirname, '..', 'uploads'),
    }).single('file'),
  );

  await app.listen(3333);
}
bootstrap();
