import { Test, TestingModule } from '@nestjs/testing';
import { AnalystController } from './analyst.controller';

describe('AnalystController', () => {
  let controller: AnalystController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalystController],
    }).compile();

    controller = module.get<AnalystController>(AnalystController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
