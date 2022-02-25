import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { useDeletedFilter } from 'src/lib/useDeletedFiler'
import { UserJWT } from '../auth/auth.service'
import { CreateNoteDto } from './dto/create-note.dto'
import { UpdateNoteDto } from './dto/update-note.dto'
import { Note, NoteDocument } from './entities/note.entity'

@Injectable()
export class NoteService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async create(user: UserJWT, createNoteDto: CreateNoteDto) {
    const candidate = await this.noteModel.create({
      ...createNoteDto,
      user_id: user.id,
    })
    return `Note ${candidate.name} created`
  }

  async findAll(user: UserJWT) {
    const notes = await this.noteModel.find({ user_id: user.id })
    const result = useDeletedFilter(notes)
    return result
  }

  async findOne(id: string, user: UserJWT): Promise<Note> {
    const note = await this.noteModel.findById(id)
    if (note.deleted) {
      throw new HttpException('Note not found', HttpStatus.BAD_REQUEST)
    }
    if (note.user_id !== user.id) {
      throw new HttpException('Note not found', HttpStatus.BAD_REQUEST)
    }
    return note
  }

  async update(id: string, updateNoteDto: UpdateNoteDto, user: UserJWT) {
    const candidate = await this.noteModel.find({ user_id: user.id, _id: id })
    if (!candidate) {
      throw new HttpException(`Note not found`, HttpStatus.BAD_REQUEST)
    }
    const note = await this.noteModel.findByIdAndUpdate(
      id,
      { ...updateNoteDto },
      { new: true }
    )
    return note
  }

  async remove(id: string, user: UserJWT) {
    const candidate = await this.noteModel.find({ user_id: user.id })
    if (!candidate) {
      throw new HttpException(`Note not found`, HttpStatus.BAD_REQUEST)
    }
    const note = await this.noteModel.findByIdAndUpdate(id, { deleted: true })
    return `Note id:${note._id}, name: ${note.name}`
  }
}
