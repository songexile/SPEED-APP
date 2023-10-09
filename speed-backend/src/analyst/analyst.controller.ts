import { Controller, Post, Body, Get, Delete, UseGuards, Param } from '@nestjs/common';

import { AnalystService } from './analyst.service';
import { Analyst } from './interfaces/analyst.interface';
import { JwtAuthGuard } from '../auth.guard';

@Controller('analyst')
export class AnalystController {
  constructor(private readonly analystService: AnalystService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async addAnalyst(@Body() analystServiceDta: any): Promise<any> {
    return await this.analystService.create(analystServiceDta);
  }

  // @Get('by-year-range')
  // async findSubmissionsByYearRange(
  //   @Query('startYear') startYear: string,
  //   @Query('endYear') endYear: string,
  // ): Promise<Analyst[]> {
  //   const parsedStartYear = parseInt(startYear, 10);
  //   const parsedEndYear = parseInt(endYear, 10);

  //   return this.analystService.findSubmissionsByYearRange(
  //     parsedStartYear,
  //     parsedEndYear,
  //   );
  // }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllAnalysts(): Promise<Analyst[]> {
    const analysts = await this.analystService.findAll();
    return analysts;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteAnalystsByID(@Param('id') id: string) {
    return this.analystService.deleteById(id);
  }
}
