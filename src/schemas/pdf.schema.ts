
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Document } from 'mongoose';

@Schema()
@ObjectType()
export class Pdf extends Document {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  @Field()
  size: string;
  
  @Prop({ required: true })
  @Field()
  link: string;
}

export const PdfSchema = SchemaFactory.createForClass(Pdf);
