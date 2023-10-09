import { Test, TestingModule } from '@nestjs/testing';
import { ModeratorService } from './moderator.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('ModeratorService', () => {
    let service: ModeratorService;
    let model: Model<any>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ModeratorService,
                {
                    provide: getModelToken('Moderator'), // Use the correct model token
                    useValue: Model,
                },
            ],
        }).compile();

        service = module.get<ModeratorService>(ModeratorService);
        // model = module.get<Model<any>>(getModelToken('Moderator'));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});