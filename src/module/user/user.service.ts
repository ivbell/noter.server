import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { User, UserDocument } from './entities/user.entity'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt')

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const { login, password, email } = createUserDto
    try {
      const candidate = await this.userModel.findOne({ login: login })
      const candidateEmail = await this.userModel.findOne({
        email: email,
      })

      if (candidate && candidateEmail) {
        return new HttpException(
          'Login or email not corrected',
          HttpStatus.BAD_REQUEST
        )
      }

      const bcryptPassword = await bcrypt.hash(password, 15)

      await this.userModel.create({
        ...createUserDto,
        password: bcryptPassword,
      })

      return new HttpException(`User ${login} created`, HttpStatus.ACCEPTED)
    } catch (error) {
      throw new HttpException(
        'Error registration, try  again',
        HttpStatus.BAD_REQUEST
      )
    }
  }

  async returnUserNoPassword(id: string): Promise<User> {
    return this.userModel.findById(id).select('-password').exec()
  }

  async findOneByLoginAndPassword(
    login: string,
    password: string
  ): Promise<User | undefined> {
    const user = await this.userModel.findOne({ login: login })

    if (!user) {
      return null
    }

    if (user.deleted) {
      return null
    }

    const pass = await bcrypt.compare(password, user.password)
    if (user && pass) {
      return this.returnUserNoPassword(user._id)
    }

    return null
  }

  async findById(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id)
    const validUser = !user && user.deleted
    if (!validUser) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
    }
    return user
  }

  async findUser(user): Promise<User> {
    return await this.userModel.findById(user.id).exec()
  }

  async returnUserRole(id: string): Promise<User> {
    return await this.userModel
      .findById(id)
      .select('-password')
      .select('-__v')
      .exec()
  }

  async userAdmin(id: string) {
    const candidate = await this.userModel.findById(id)
    if (!candidate) {
      return false
    }
    if (candidate.role === 'admin') {
      return true
    } else {
      return false
    }
  }

  async deletedUser(id: string) {
    const candidate = await this.userModel.findByIdAndUpdate(id, {
      deleted: true,
    })

    return new HttpException(
      `User ${candidate.login} deleted`,
      HttpStatus.ACCEPTED
    )
  }
}
