import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type NoteDocument = Note & Document

@Schema({ timestamps: true })
export class Note {
  @Prop({ required: true })
  user_id: string

  @Prop({ required: true })
  name: string

  @Prop()
  body: string

  @Prop({ default: false })
  deleted: boolean
}

export const NoteSchema = SchemaFactory.createForClass(Note)
