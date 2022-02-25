import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {useDeletedFilter} from 'src/lib/useDeletedFiler'
import {CreateAbilityDto} from './dto/create-ability.dto'
import {UpdateAbilityDto} from './dto/update-ability.dto'
import {Ability, AbilityDocument} from './entities/ability.entity'

@Injectable()
export class AbilityService {
  constructor(
    @InjectModel(Ability.name) private abilityModel: Model<AbilityDocument>
  ) {
  }

  async create(createAbilityDto: CreateAbilityDto): Promise<Ability> {
    return this.abilityModel.create({...createAbilityDto})
  }

  async findAll(): Promise<Ability[]> {
    const allAbility = await this.abilityModel.find()
    return useDeletedFilter(allAbility)
  }

  async findByClass(id: string): Promise<Ability[]> {
    const classAbility = await this.abilityModel.find({class_id: id})
    return useDeletedFilter(classAbility)
  }

  async findBySpec(id: string): Promise<Ability[]> {
    const specAbility = await this.abilityModel.find({spec_id: id})
    return useDeletedFilter(specAbility)
  }

  async update(
    id: number,
    updateAbilityDto: UpdateAbilityDto
  ): Promise<Ability> {
    return this.abilityModel.findByIdAndUpdate(
      id,
      {...updateAbilityDto},
      {new: true}
    )
  }

  async remove(id: number) {
    const candidate = await this.abilityModel.findByIdAndUpdate(id, {
      deleted: true,
    })
    return `This action removes a #${candidate.name} ability`
  }
}
