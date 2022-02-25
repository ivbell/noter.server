import { forwardRef, Module } from "@nestjs/common";
import { AbilityService } from "./ability.service";
import { AbilityController } from "./ability.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Ability, AbilitySchema } from "./entities/ability.entity";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [AbilityController],
  providers: [AbilityService],
  imports: [
    MongooseModule.forFeature([{ name: Ability.name, schema: AbilitySchema }]),
    forwardRef(() => AuthModule),
  ],
})
export class AbilityModule {}
