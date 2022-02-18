import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from '../user/entities/user.entity'
import { UserService } from '../user/user.service'
import { CreateClassDto } from './dto/create-class.dto'
import { UpdateClassDto } from './dto/update-class.dto'
import { Class, ClassDocument } from './entities/class.entity'

@Injectable()
export class ClassesService {
    constructor(
        @InjectModel(Class.name) private classModel: Model<ClassDocument>,
        private readonly userService: UserService
    ) {}

    async create(createClassDto: CreateClassDto, user) {
        const admin = await this.userService.userAdmin(user.id)

        if (!admin) {
            return new HttpException(
                'Not enough rights',
                HttpStatus.BAD_REQUEST
            )
        }

        const { name } = createClassDto

        if (!name) {
            throw new HttpException('Name not null', HttpStatus.BAD_REQUEST)
        }
        const candidate = await this.classModel.findOne({ name: name })
        if (candidate) {
            return new HttpException(
                'The class name already exists',
                HttpStatus.BAD_REQUEST
            )
        }
        const newClass = await this.classModel.create(createClassDto)
        return newClass
    }

    async findAll() {
        const classes = await this.classModel.find()
        return classes
    }

    findOne(id: string) {
        const oneClass = this.classModel.findById(id)
        return oneClass
    }

    async update(id: string, updateClassDto: UpdateClassDto) {
        const candidate = await this.classModel.findByIdAndUpdate(
            id,
            {
                ...updateClassDto,
            },
            { new: true }
        )
        return candidate
    }

    async remove(id: string) {
        const oneClass = await this.classModel.findByIdAndDelete(id)
        return `This action removes a ${oneClass.name} class`
    }
}
