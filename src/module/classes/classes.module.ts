import { forwardRef, Module } from '@nestjs/common'
import { ClassesService } from './classes.service'
import { ClassesController } from './classes.controller'
import { AuthModule } from '../auth/auth.module'
import { MongooseModule } from '@nestjs/mongoose'
import { Class, ClassesSchema } from './entities/class.entity'
import { UserModule } from '../user/user.module'

@Module({
    controllers: [ClassesController],
    providers: [ClassesService],
    imports: [
        forwardRef(() => AuthModule),
        forwardRef(() => UserModule),
        MongooseModule.forFeature([
            { name: Class.name, schema: ClassesSchema },
        ]),
    ],
})
export class ClassesModule {}
