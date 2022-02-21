import { IsUrl } from "class-validator";

export class CreateAbilityDto {
  readonly name: string;
  readonly class_id: string;
  readonly spec_id?: string;
  @IsUrl()
  readonly icon: string;
}
