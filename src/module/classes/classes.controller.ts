import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from '../auth/guards/jwt.guards'
import { ClassesService } from './classes.service'
import { UpdateClassDto } from './dto/update-class.dto'

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req) {
    return this.classesService.create(req.body, req.user)
  }

  @Get()
  findAll() {
    return this.classesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classesService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classesService.update(id, updateClassDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classesService.remove(id)
  }
}
