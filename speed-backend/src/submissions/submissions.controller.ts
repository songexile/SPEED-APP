import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  NotFoundException,
  Query,
  Delete,
} from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { Submission } from './interfaces/submission.interface'; // Import the Submission interface

@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  async addSubmission(@Body() createSubmissionDto: any): Promise<any> {
    return await this.submissionsService.create(createSubmissionDto);
  }

  @Get('by-year-range') // Move this route handler before the @Get(':id') handler
  async findSubmissionsByYearRange(
    @Query('startYear') startYear: string,
    @Query('endYear') endYear: string,
  ): Promise<Submission[]> {
    const parsedStartYear = parseInt(startYear, 10);
    const parsedEndYear = parseInt(endYear, 10);

    return this.submissionsService.findSubmissionsByYearRange(
      parsedStartYear,
      parsedEndYear,
    );
  }

  @Get(':id')
  async getSubmissionById(@Param('id') id: string): Promise<any> {
    const submission = await this.submissionsService.findById(id);
    if (!submission) {
      throw new NotFoundException('Submission not found');
    }
    return submission;
  }

  @Get()
  async getAllSubmissions(): Promise<Submission[]> {
    const submissions = await this.submissionsService.findAll();
    return submissions;
  }

  @Delete(':id')
  async deleteSubmission(@Param('id') id: string) {
    console.log('Trying to delete submission with ID:', id);
    return this.submissionsService.deleteById(id);
  }
}
