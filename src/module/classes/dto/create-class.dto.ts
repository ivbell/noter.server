import { IsHexColor, IsNotEmpty, IsUrl } from 'class-validator'

export class CreateClassDto {
    @IsNotEmpty()
    readonly name: string

    @IsUrl()
    readonly icon?: string

    @IsHexColor()
    readonly color: string
}
