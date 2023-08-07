import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pdf } from './pdf.entity';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class PdfService {
  constructor(
    @InjectRepository(Pdf)
    private readonly pdfRepository: Repository<Pdf>,
  ) {}

  async create(pdfData: Pdf): Promise<Pdf> {
    return this.pdfRepository.save(pdfData);
  }
  async findAll(): Promise<Pdf[]> {
    return this.pdfRepository.find();
  }
  async findOne(id: number): Promise<Pdf> {
    const options: FindOneOptions<Pdf> = {
      where: {
        id,
      },
    };
    return this.pdfRepository.findOne(options);
  }
  async update(
    id: number,
    pdfData: Pdf,
  ): Promise<Pdf> {
    await this.pdfRepository.update(id, pdfData);
    const options: FindOneOptions<Pdf> = {
      where: {
        id,
      },
    };
    return this.pdfRepository.findOne(options);
  }
  async remove(id: number): Promise<void> {
    await this.pdfRepository.delete(id);
  }
}
