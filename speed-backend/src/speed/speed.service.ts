import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Speed } from './interfaces/speed.interface';

@Injectable()
export class SpeedService {
    constructor(
        @InjectModel('Speed') private readonly speedModel: Model<any>,
    ) {}

    async create(speed: Speed): Promise<Speed> {
        const newSpeed = new this.speedModel(speed);
        return await newSpeed.save();
    }

    async findAll(): Promise<Speed[]> {
        const speeds = await this.speedModel.find().exec();
        return speeds as Speed[];
    }

    async findById(id: string): Promise<Speed | null> {
        const speed = await this.speedModel.findById(id).exec();
        if (!speed) {
            throw new NotFoundException('Article not found');
        }
        return speed;
    }

    async deleteById(id: string): Promise<Speed | null> {
        const deletedSubmission = await this.speedModel
            .findByIdAndDelete(id)
            .exec();

        if (!deletedSubmission) {
            throw new NotFoundException('Speed Article not found');
        }
        return deletedSubmission;
    }

    async findSubmissionsByYearRange(
        startYear: number,
        endYear: number,
    ): Promise<Speed[]> {
        const submissions = await this.speedModel
            .find({
                year: { $gte: startYear, $lte: endYear },
            })
            .exec();
        return submissions as Speed[];
    }
}
