import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type SpecDocument = Spec & Document;
@Schema({ timestamps: true })
export class Spec {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  class_id: string;

  @Prop()
  icon: string;
}

export const SpecSchema = SchemaFactory.createForClass(Spec);
