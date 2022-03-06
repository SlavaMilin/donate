import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DonateDocument = Donate & Document;

@Schema()
export class Donate {
  @Prop({ required: true })
  amount: string;

  @Prop({ required: true })
  currency: string;
}

export const DonateSchema = SchemaFactory.createForClass(Donate);
