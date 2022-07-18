import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'yaml';

async function bootstrap() {
  console.log(process.env.PORT);
  const app = await NestFactory.create(AppModule);

  const document = await readFile(
    join(__dirname, '..', 'doc/api.yaml'),
    'utf-8',
  );

  SwaggerModule.setup('doc', app, parse(document));

  await app.listen(process.env.PORT || 4000);
}

bootstrap();
