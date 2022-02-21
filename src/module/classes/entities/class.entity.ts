import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ClassDocument = Class & Document;

@Schema({ timestamps: true })
export class Class {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ default: "" })
  icon: string;

  @Prop({ default: "" })
  color: string;
}

export const ClassesSchema = SchemaFactory.createForClass(Class);
