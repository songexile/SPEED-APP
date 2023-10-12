import { Controller, Post, Body, Get, Delete, UseGuards, Param, Query, NotFoundException } from '@nestjs/common';

import { SpeedService } from './speed.service';
import { Speed } from './interfaces/speed.interface';
import { JwtAuthGuard } from '../auth.guard';

@Controller('speed')
export class SpeedController {
    constructor(private readonly speedService: SpeedService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async addSpeed(@Body() speedServiceDta: any): Promise<any> {
        return await this.speedService.create(speedServiceDta);
    }
    
    @Get('by-year-range')
    async findSpeedByYearRange(
        @Query('startYear') startYear: string,
        @Query('endYear') endYear: string,
    ): Promise<Speed[]> {
        const parsedStartYear = parseInt(startYear, 10);
        const parsedEndYear = parseInt(endYear, 10);

        return this.speedService.findSpeedByYearRange(
            parsedStartYear,
            parsedEndYear,
        );
    }

    @Get('by-method')
    async findSpeedByMethod(@Query('method') method: string): Promise<Speed[]> {
        return this.speedService.findSpeedByMethod(method);
    }

    @Get('by-year-range-and-method')
    async findSpeedByYearRangeAndMethod(
        @Query('startYear') startYear: string,
        @Query('endYear') endYear: string,
        @Query('method') method: string,
    ): Promise<Speed[]> {
        const parsedStartYear = parseInt(startYear, 10);
        const parsedEndYear = parseInt(endYear, 10);

        return this.speedService.findSpeedByYearRangeAndMethod(
            parsedStartYear,
            parsedEndYear,
            method,
        );
    }

    @Get()
    async getAllSpeeds(): Promise<Speed[]> {
        const speeds = await this.speedService.findAll();
        return speeds;
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getSpeedById(@Param('id') id: string): Promise<any> {
        const speed = await this.speedService.findById(id);
        if (!speed) {
            throw new NotFoundException('Speed not found');
        }
        return speed;
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteSpeedsByID(@Param('id') id: string) {
        return this.speedService.deleteById(id);
    }
}
