import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty()
    readonly login: string

    @MinLength(8)
    @IsNotEmpty()
    readonly password: string

    @IsEmail()
    readonly email: string
}
