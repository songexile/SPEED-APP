import { Test, TestingModule } from '@nestjs/testing';
import { AnalystService } from './analyst.service';

describe('AnalystService', () => {
  let service: AnalystService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnalystService],
    }).compile();

    service = module.get<AnalystService>(AnalystService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
