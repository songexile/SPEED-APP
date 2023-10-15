import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  NotFoundException,
  Delete,
  UseGuards,
  ConflictException,
} from '@nestjs/common';
import { ModeratorService } from './moderator.service';
import { Moderator } from './interfaces/moderator.interface';
import { JwtAuthGuard } from '../auth.guard';

@Controller('moderator')
export class ModeratorController {
  constructor(private readonly moderatorService: ModeratorService) {}

  @Post()
  async addModerator(@Body() createModeratorDto: any): Promise<any> {
    const isUnique = await this.moderatorService.isContentUnique(createModeratorDto.title, createModeratorDto.authors);

    if (!isUnique) {
      throw new ConflictException('Entry with the same title and authors already exists');
    }

    return await this.moderatorService.create(createModeratorDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getModeratorById(@Param('id') id: string): Promise<any> {
    const moderator = await this.moderatorService.findById(id);
    if (!moderator) {
      throw new NotFoundException('Moderator not found');
    }
    return moderator;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllModerator(): Promise<Moderator[]> {
    const moderator = await this.moderatorService.findAll();
    return moderator;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteModerator(@Param('id') id: string) {
    return this.moderatorService.deleteById(id);
  }
}
