import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';
import { PdfsModule } from './pdfs/pdfs.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/riseUpMedia'),
    EventsModule,
    PdfsModule,
  ],
})
export class AppModule {}
