import { Test, TestingModule } from '@nestjs/testing';
import { SubmissionsService } from './submissions.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('SubmissionsService', () => {
  let service: SubmissionsService;
  let model: Model<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubmissionsService,
        {
          provide: getModelToken('Submission'), // Use the correct model token
          useValue: Model,
        },
      ],
    }).compile();

    service = module.get<SubmissionsService>(SubmissionsService);
    model = module.get<Model<any>>(getModelToken('Submission'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
