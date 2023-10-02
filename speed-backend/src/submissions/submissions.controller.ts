import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  NotFoundException,
  Query,
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

  @Get('by-year-range') // This is the correct route for year-range search
  async findSubmissionsByYearRange(
    @Query('startYear') startYear: string, // Change the type to string
    @Query('endYear') endYear: string, // Change the type to string
  ): Promise<Submission[]> {
    const parsedStartYear = parseInt(startYear, 10);
    const parsedEndYear = parseInt(endYear, 10);

    return this.submissionsService.findSubmissionsByYearRange(
      parsedStartYear,
      parsedEndYear,
    );
  }
}
