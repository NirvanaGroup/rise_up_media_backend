

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType, ID } from '@nestjs/graphql';
import mongoose, { Document } from 'mongoose';
import { Pdf } from './pdf.schema';

@ObjectType()
@Schema()
export class Event extends Document {
  @Field(() => ID)
  _id: string;

  @Field({ nullable: true })
  @Prop()
  banner_link: string;

  @Field()
  @Prop()
  title: string;

  @Field()
  @Prop()
  short_description: string;

  @Field()
  @Prop()
  long_description: string;

  @Field()
  @Prop()
  date: string;

  @Field(() => [String], { nullable: true })
  @Prop([String])
  links: string[];

  @Field(() => [Pdf], { nullable: true })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pdf' }] })
  pdfs?: Pdf[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
