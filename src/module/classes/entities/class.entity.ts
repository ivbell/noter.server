import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ClassDocument = Class & Document

@Schema({ timestamps: true })
export class Class {
  @Prop({ required: true })
  name: string

  @Prop({ default: '' })
  icon: string

  @Prop({ default: '' })
  color: string

  @Prop({ default: false })
  deleted: boolean
}

export const ClassesSchema = SchemaFactory.createForClass(Class)
