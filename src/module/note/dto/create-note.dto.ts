import { IsNotEmpty } from 'class-validator'

export class CreateNoteDto {
  @IsNotEmpty()
  readonly user_id: string

  @IsNotEmpty()
  readonly name: string

  readonly body: string
}
