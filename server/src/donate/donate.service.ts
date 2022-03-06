import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Donate, DonateDocument } from './donate.schema';
import { Model } from 'mongoose';
import { CreateDonateDto } from './dto/create-donate.dto';

@Injectable()
export class DonateService {
  constructor(
    @InjectModel(Donate.name) private donateModel: Model<DonateDocument>,
  ) {}

  async create(createDonateDto: CreateDonateDto): Promise<Donate> {
    const createdDonate = new this.donateModel(createDonateDto);
    return createdDonate.save();
  }
}
