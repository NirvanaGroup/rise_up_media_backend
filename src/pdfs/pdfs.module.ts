import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pdf, PdfSchema } from '../schemas/pdf.schema';
import { PdfsController } from './pdfs.controller';
import { PdfResolver } from './pdfs.resolver';
import { PdfsService } from './pdfs.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Pdf.name,
        schema: PdfSchema,
      },
    ]),
  ],
  controllers: [PdfsController],
  providers: [PdfsService, PdfResolver],
})
export class PdfsModule {}
