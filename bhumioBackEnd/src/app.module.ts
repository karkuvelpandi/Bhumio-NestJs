import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PdfModule } from './pdf/pdf.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '4591',
      database: 'Bhumio',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PdfModule,
  ],
})
export class AppModule {}
