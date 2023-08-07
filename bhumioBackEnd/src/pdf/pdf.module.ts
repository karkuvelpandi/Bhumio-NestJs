import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { Pdf } from './pdf.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pdf]), // Import PdfEntity into the module
  ],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
