import {IsNotEmpty, IsNumber, IsUrl} from 'class-validator'

export class CreateAbilityDto {
  @IsNotEmpty()
  readonly name: string
  @IsNotEmpty()
  readonly class_id: string
  @IsNotEmpty()
  @IsNumber()
  readonly link_wowhead: string
  @IsUrl()
  readonly icon: string
}
