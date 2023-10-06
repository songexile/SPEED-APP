import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Submission } from './interfaces/submission.interface';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectModel('Submission') private readonly submissionModel: Model<any>,
  ) {}

  async findById(id: string): Promise<Submission | null> {
    const submission = await this.submissionModel.findById(id).exec();
    if (!submission) {
      throw new NotFoundException('Submission not found');
    }
    return submission;
  }

  async create(submission: Submission): Promise<Submission> {
    const newSubmission = new this.submissionModel(submission);
    return await newSubmission.save();
  }

  async findAll(): Promise<Submission[]> {
    const submissions = await this.submissionModel.find().exec();
    return submissions as Submission[]; // Explicitly specify the return type as Submission[]
  }

  async deleteById(id: string): Promise<Submission | null> {
    const deletedSubmission = await this.submissionModel
      .findByIdAndDelete(id)
      .exec();

    if (!deletedSubmission) {
      throw new NotFoundException('Submission not found');
    }
    return deletedSubmission;
  }

  async findSubmissionsByYearRange(
    startYear: number,
    endYear: number,
  ): Promise<Submission[]> {
    const submissions = await this.submissionModel
      .find({
        year: { $gte: startYear, $lte: endYear },
      })
      .exec();
    return submissions as Submission[]; // Explicitly specify the return type as Submission[]
  }
}
