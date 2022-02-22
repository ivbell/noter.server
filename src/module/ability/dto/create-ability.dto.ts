import { IsNotEmpty, IsUrl } from 'class-validator'

export class CreateAbilityDto {
  @IsNotEmpty()
  readonly name: string
  @IsNotEmpty()
  readonly class_id: string
  readonly spec_id?: string
  @IsUrl()
  readonly icon: string
}
