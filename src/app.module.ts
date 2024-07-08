import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';
import { PdfsModule } from './pdfs/pdfs.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/riseUpMedia'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    EventsModule,
    PdfsModule,
  ],
})
export class AppModule {}



