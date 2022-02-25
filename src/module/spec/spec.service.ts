import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateSpecDto } from "./dto/create-spec.dto";
import { UpdateSpecDto } from "./dto/update-spec.dto";
import { Spec, SpecDocument } from "./entities/spec.entity";

@Injectable()
export class SpecService {
  constructor(@InjectModel(Spec.name) private specModel: Model<SpecDocument>) {}

  async create(createSpecDto: CreateSpecDto) {
    await this.specModel.create({ ...createSpecDto });
    return new HttpException("Spec created", HttpStatus.ACCEPTED);
  }

  async findAllSpecClass(id: string) {
    const allSpecByClass = await this.specModel.find({ class_id: id });
    return allSpecByClass;
  }

  async update(id: string, updateSpecDto: UpdateSpecDto): Promise<Spec> {
    const specUpdate = await this.specModel.findByIdAndUpdate(
      id,
      { ...updateSpecDto },
      { new: true }
    );
    return specUpdate;
  }

  async remove(id: string) {
    const deleteSpec = await this.specModel.findByIdAndDelete(id);
    return new HttpException(
      `Spec ${deleteSpec.name} deleted`,
      HttpStatus.ACCEPTED
    );
  }
}
