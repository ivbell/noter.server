import { forwardRef, Module } from '@nestjs/common'
import { NoteService } from './note.service'
import { NoteController } from './note.controller'
import { AuthModule } from '../auth/auth.module'
import { MongooseModule } from '@nestjs/mongoose'
import { Note, NoteSchema } from './entities/note.entity'

@Module({
  controllers: [NoteController],
  providers: [NoteService],
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
  ],
})
export class NoteModule {}
