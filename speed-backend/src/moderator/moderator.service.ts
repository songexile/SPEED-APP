import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Moderator } from './interfaces/moderator.interface';

@Injectable()
export class ModeratorService {
  constructor(
    @InjectModel('Moderator') private readonly moderatorModel: Model<any>,
  ) {}

  async findById(id: string): Promise<Moderator | null> {
    const moderator = await this.moderatorModel.findById(id).exec();
    if (!moderator) {
      throw new NotFoundException('Article not found');
    }
    return moderator;
  }

  async isContentUnique(title: string, authors: string): Promise<boolean> {
    const existingRecord = await this.moderatorModel.findOne({ title, authors }).exec();
    return !existingRecord;
  }

  async create(moderator: Moderator): Promise<Moderator> {
    const newModerator = new this.moderatorModel(moderator);
    return await newModerator.save();
  }

  async findAll(): Promise<Moderator[]> {
    const moderator = await this.moderatorModel.find().exec();
    return moderator as Moderator[]; // Explicitly specify the return type as Moderator[]
  }

  async deleteById(id: string): Promise<Moderator | null> {
    const deletedModerator = await this.moderatorModel
      .findByIdAndDelete(id)
      .exec();

    if (!deletedModerator) {
      throw new NotFoundException('Article not found');
    }
    return deletedModerator;
  }
}
