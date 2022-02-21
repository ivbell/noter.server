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
import { JwtAuthGuard } from "../auth/guards/jwt.guards";
import { AbilityService } from "./ability.service";
import { CreateAbilityDto } from "./dto/create-ability.dto";
import { UpdateAbilityDto } from "./dto/update-ability.dto";

@Controller("ability")
export class AbilityController {
  constructor(private readonly abilityService: AbilityService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAbilityDto: CreateAbilityDto) {
    return this.abilityService.create(createAbilityDto);
  }

  @Get()
  findAll() {
    return this.abilityService.findAll();
  }

  @Get()
  findOneByClass(@Param("id") id: string) {
    return this.abilityService.findByClass(id);
  }

  @Get(":id")
  findOneBySpec(@Param("id") id: string) {
    return this.abilityService.findBySpec(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAbilityDto: UpdateAbilityDto) {
    return this.abilityService.update(+id, updateAbilityDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.abilityService.remove(+id);
  }
}
