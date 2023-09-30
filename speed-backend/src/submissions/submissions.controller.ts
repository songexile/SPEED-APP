// submissions.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { SubmissionsService } from './submissions.service';

@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  async addSubmission(@Body() createSubmissionDto: any): Promise<any> {
    return await this.submissionsService.create(createSubmissionDto);
  }
  @Get(':id')
  async getSubmissionById(@Param('id') id: string): Promise<any> {
    const submission = await this.submissionsService.findById(id);
    if (!submission) {
      throw new NotFoundException('Submission not found');
    }
    return submission;
  }
}
