import { forwardRef, Module } from "@nestjs/common";
import { SpecService } from "./spec.service";
import { SpecController } from "./spec.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Spec, SpecSchema } from "./entities/spec.entity";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [SpecController],
  providers: [SpecService],
  imports: [
    MongooseModule.forFeature([{ name: Spec.name, schema: SpecSchema }]),
    forwardRef(() => AuthModule),
  ],
})
export class SpecModule {}
