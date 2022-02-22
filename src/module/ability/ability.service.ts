import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { useDeletedFilter } from 'src/lib/useDeletedFiler'
import { CreateAbilityDto } from './dto/create-ability.dto'
import { UpdateAbilityDto } from './dto/update-ability.dto'
import { Ability, AbilityDocument } from './entities/ability.entity'

@Injectable()
export class AbilityService {
  constructor(
    @InjectModel(Ability.name) private abilityModel: Model<AbilityDocument>
  ) {}

  async create(createAbilityDto: CreateAbilityDto): Promise<Ability> {
    const candidate = this.abilityModel.create({ ...createAbilityDto })
    return candidate
  }

  async findAll(): Promise<Ability[]> {
    const allAbility = await this.abilityModel.find()
    const result = useDeletedFilter(allAbility)
    return result
  }

  async findByClass(id: string): Promise<Ability[]> {
    const classAbility = await this.abilityModel.find({ class_id: id })
    const result = useDeletedFilter(classAbility)
    return result
  }

  async findBySpec(id: string): Promise<Ability[]> {
    const specAbility = await this.abilityModel.find({ spec_id: id })
    const result = useDeletedFilter(specAbility)
    return result
  }

  async update(
    id: number,
    updateAbilityDto: UpdateAbilityDto
  ): Promise<Ability> {
    const newAbility = await this.abilityModel.findByIdAndUpdate(
      id,
      { ...updateAbilityDto },
      { new: true }
    )
    return newAbility
  }

  async remove(id: number) {
    const candidate = await this.abilityModel.findByIdAndUpdate(id, {
      deleted: true,
    })
    return `This action removes a #${candidate.name} ability`
  }
}
