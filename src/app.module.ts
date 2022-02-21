import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./module/auth/auth.module";
import { UserModule } from "./module/user/user.module";
import { ClassesModule } from "./module/classes/classes.module";
import { SpecModule } from "./module/spec/spec.module";
import { NoteModule } from "./module/note/note.module";
import { AbilityModule } from "./module/ability/ability.module";
import configuration from "./config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/src/config/env/${
        process.env.NODE_ENV
      }.env`,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("mongodb_uri"),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    ClassesModule,
    SpecModule,
    NoteModule,
    AbilityModule,
  ],
})
export class AppModule {}
