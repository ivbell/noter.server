import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { SpecService } from "./spec.service";
import { CreateSpecDto } from "./dto/create-spec.dto";
import { UpdateSpecDto } from "./dto/update-spec.dto";
import { JwtAuthGuard } from "../auth/guards/jwt.guards";

@Controller("spec")
export class SpecController {
  constructor(private readonly specService: SpecService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSpecDto: CreateSpecDto) {
    return this.specService.create(createSpecDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.specService.findAllSpecClass(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSpecDto: UpdateSpecDto) {
    return this.specService.update(id, updateSpecDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.specService.remove(id);
  }
}
