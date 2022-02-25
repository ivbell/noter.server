import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common'
import { NoteService } from './note.service'
import { CreateNoteDto } from './dto/create-note.dto'
import { UpdateNoteDto } from './dto/update-note.dto'
import { JwtAuthGuard } from '../auth/guards/jwt.guards'

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(req.user, createNoteDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req) {
    const { user } = req
    return this.noteService.findAll(user)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Req() req, @Param('id') id: string) {
    return this.noteService.findOne(id, req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto
  ) {
    return this.noteService.update(id, updateNoteDto, req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.noteService.remove(id, req.user)
  }
}
