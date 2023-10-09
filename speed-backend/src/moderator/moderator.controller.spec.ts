import { Test, TestingModule } from '@nestjs/testing';
import { ModeratorController } from './moderator.controller';
import { ModeratorService } from './moderator.service';

// Mock the ModeratorModel
const moderatorModelMock = {
    // Define mock methods or properties here as needed.
};

describe('ModeratorController', () => {
    let controller: ModeratorController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ModeratorController],
            providers: [
                ModeratorService,
                { provide: 'ModeratorModel', useValue: moderatorModelMock }, // Mock ModeratorModel
            ],
        }).compile();

        controller = module.get<ModeratorController>(ModeratorController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});