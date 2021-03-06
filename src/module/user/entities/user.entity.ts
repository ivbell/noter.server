import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  login: string

  @Prop({ required: true })
  password: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ default: 'user' })
  role: string

  @Prop({ default: false })
  active: boolean

  @Prop()
  activation_link: string

  @Prop({ default: false })
  deleted: boolean
}

export const UserSchema = SchemaFactory.createForClass(User)
