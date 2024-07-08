
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pdf } from '../schemas/pdf.schema';
import { CreatePdfDto } from './dto/CreatePdf.dto';
import { UpdatePdfDto } from './dto/UpdatePdf.dto';

@Injectable()
export class PdfsService {
  constructor(@InjectModel(Pdf.name) private pdfModel: Model<Pdf>) {}

  async createPdf(createPdfDto: CreatePdfDto): Promise<Pdf> {
    const newPdf = new this.pdfModel(createPdfDto);
    return newPdf.save();
  }

  async createPdfs(createPdfDtos: CreatePdfDto[]): Promise<Pdf[]> {
    return await this.pdfModel.insertMany(createPdfDtos);
  }

  getPdfs() {
    return this.pdfModel.find().exec();
  }

  getPdfById(id: string) {
    return this.pdfModel.findById(id).exec();
  }

  updatePdf(id: string, updatePdfDto: UpdatePdfDto) {
    return this.pdfModel
      .findByIdAndUpdate(id, updatePdfDto, { new: true })
      .exec();
  }

  deletePdf(id: string) {
    return this.pdfModel.findByIdAndDelete(id).exec();
  }
}


