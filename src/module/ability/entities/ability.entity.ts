import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type AbilityDocument = Ability & Document
@Schema({ timestamps: true })
export class Ability {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  class_id: string

  @Prop()
  spec_id: string

  @Prop()
  icon: string
}

export const AbilitySchema = SchemaFactory.createForClass(Ability)
