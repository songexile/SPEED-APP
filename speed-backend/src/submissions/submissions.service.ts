// submissions.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectModel('Submission') private readonly submissionModel: Model<any>,
  ) {}

  async create(createSubmissionDto: any): Promise<any> {
    const createdSubmission = new this.submissionModel(createSubmissionDto);
    return await createdSubmission.save();
  }
}
