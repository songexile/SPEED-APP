import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  NotFoundException,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { Submission } from './interfaces/submission.interface'; // Import the Submission interface
import { JwtAuthGuard } from '../auth.guard';

@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) { }

  @Post()
  async addSubmission(@Body() createSubmissionDto: any): Promise<any> {
    return await this.submissionsService.create(createSubmissionDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getSubmissionById(@Param('id') id: string): Promise<any> {
    const submission = await this.submissionsService.findById(id);
    if (!submission) {
      throw new NotFoundException('Submission not found');
    }
    return submission;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllSubmissions(): Promise<Submission[]> {
    const submissions = await this.submissionsService.findAll();
    return submissions;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteSubmission(@Param('id') id: string) {
    console.log('Trying to delete submission with ID:', id);
    return this.submissionsService.deleteById(id);
  }
}
