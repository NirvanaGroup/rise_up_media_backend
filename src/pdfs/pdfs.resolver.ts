
import { Resolver, Query, Args } from '@nestjs/graphql';
import { PdfsService } from './pdfs.service';
import { Pdf } from '../schemas/pdf.schema';

@Resolver(() => Pdf)
export class PdfResolver {
  constructor(private readonly pdfsService: PdfsService) {}

  @Query(() => [Pdf])
  getPdfs() {
    return this.pdfsService.getPdfs();
  }

  @Query(() => Pdf)
  getPdfById(@Args('id') id: string) {
    return this.pdfsService.getPdfById(id);
  }
}

