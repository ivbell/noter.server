import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose'

export type AbilityDocument = Ability & Document

@Schema({timestamps: true})
export class Ability {
  @Prop({required: true})
  name: string

  @Prop({required: true})
  class_id: string

  @Prop()
  spec_id: string

  @Prop()
  link_wowhead: string

  @Prop({unique: true})
  wowhead_id: string

  @Prop({default: false})
  deleted: boolean

  @Prop()
  icon: string
}

export const AbilitySchema = SchemaFactory.createForClass(Ability)
