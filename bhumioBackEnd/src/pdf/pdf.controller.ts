import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { PdfService } from './pdf.service';
import { Pdf } from './pdf.entity';

@Controller('pdf')
export class PdfController {
  constructor(
    private readonly pdfService: PdfService,
  ) {}
  /*
    URL   : http://localhost:3333/pdf/
    METHOD: GET
    FIELDS: N/A
 */
  @Get()
  async findAll(): Promise<Pdf[]> {
    return this.pdfService.findAll();
  }
  /*
    URL   : http://localhost:3333/pdf/:id
    METHOD: GET
    FIELDS: N/A
 */
  @Get(':id')
  async findOne(
    @Param('id') id: number,
  ): Promise<Pdf> {
    return this.pdfService.findOne(id);
  }
  /*
    URL   : http://localhost:3333/pdf/create
    METHOD: POST
    FIELDS: id(optional), name, pdfUrl.
 */
  @Post('create')
  async create(
    @Body() pdfData: Pdf,
  ): Promise<Pdf> {
    return this.pdfService.create(pdfData);
  }
  /*
    URL   : http://localhost:3333/pdf/:id
    METHOD: PUT
    FIELDS: id(optional), name, pdfUrl.
 */
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() pdfData: Pdf,
  ): Promise<Pdf> {
    return this.pdfService.update(id, pdfData);
  }
  /*
    URL   : http://localhost:3333/pdf/:id
    METHOD: DELETE
    FIELDS: N/A
 */
  @Delete(':id')
  async remove(
    @Param('id') id: number,
  ): Promise<void> {
    return this.pdfService.remove(id);
  }
}
