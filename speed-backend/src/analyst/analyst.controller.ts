import { Controller, Post, Body, Get } from '@nestjs/common';

import { AnalystService } from './analyst.service';
import { Analyst } from './interfaces/analyst.interface';

@Controller('analyst')
export class AnalystController {
  constructor(private readonly analystService: AnalystService) {}

  @Post()
  async addAnalyst(@Body() analystServiceDta: any): Promise<any> {
    return await this.analystService.create(analystServiceDta);
  }

  @Get()
  async getAllAnalysts(): Promise<Analyst[]> {
    const analysts = await this.analystService.findAll();
    return analysts;
  }
}
