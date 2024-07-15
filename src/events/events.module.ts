import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from '../schemas/Event.schema';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventsResolver } from './events.resolver';  // Add this line
import { Pdf, PdfSchema } from '../schemas/pdf.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      {
        name: Pdf.name,
        schema: PdfSchema,
      },
    ]),
  ],
  providers: [EventsService, EventsResolver],  // Add EventsResolver here
  controllers: [EventsController],
})
export class EventsModule {}



