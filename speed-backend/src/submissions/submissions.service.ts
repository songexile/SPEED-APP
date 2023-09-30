// submissions.service.ts
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
    try {
      const submission = await this.submissionModel.findById(id).exec();
      return submission;
    } catch (error) {
      throw new NotFoundException('Submission not found');
    }
  }

  async create(createSubmissionDto: Submission): Promise<Submission> {
    const createdSubmission = new this.submissionModel(createSubmissionDto);

    try {
      const savedSubmission = await createdSubmission.save();
      if (savedSubmission) {
        return savedSubmission;
      } else {
        throw new NotFoundException('Submission could not be created');
      }
    } catch (error) {
      throw new NotFoundException('Submission could not be created');
    }
  }
}
