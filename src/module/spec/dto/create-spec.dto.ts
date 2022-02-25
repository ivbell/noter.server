import { IsUrl } from "class-validator";

export class CreateSpecDto {
  readonly name: string;
  readonly class_id: string;
  @IsUrl()
  readonly icon: string;
}
