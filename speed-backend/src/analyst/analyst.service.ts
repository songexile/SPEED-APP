import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Analyst } from './interfaces/analyst.interface';

@Injectable()
export class AnalystService {
  constructor(
    @InjectModel('Analyst') private readonly analystModel: Model<any>,
  ) {}

  async create(analyst: Analyst): Promise<Analyst> {
    const newAnalyst = new this.analystModel(analyst);
    return await newAnalyst.save();
  }

  async findAll(): Promise<Analyst[]> {
    const analysts = await this.analystModel.find().exec();
    return analysts as Analyst[]; // Explicitly specify the return type as Analyst[]
  }

  async findSubmissionsByYearRange(
    startYear: number,
    endYear: number,
  ): Promise<Analyst[]> {
    const submissions = await this.analystModel
      .find({
        year: { $gte: startYear, $lte: endYear },
      })
      .exec();
    return submissions as Analyst[];
  }
}
