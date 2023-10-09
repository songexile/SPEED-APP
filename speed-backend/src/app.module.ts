import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ModeratorSchema } from './moderator/schemas/moderator.schema';
import { ModeratorController } from './moderator/moderator.controller';
import { ModeratorService } from './moderator/moderator.service';

import { AnalystSchema } from './analyst/schemas/analyst.schema';
import { AnalystController } from './analyst/analyst.controller';
import { AnalystService } from './analyst/analyst.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }), // Load environment variables
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      { name: 'Moderator', schema: ModeratorSchema },
      { name: 'Analyst', schema: AnalystSchema },
    ]),
    AuthModule, // Inject schema
  ],
  controllers: [AppController, ModeratorController, AnalystController],
  providers: [AppService, ModeratorService, AnalystService],
})
export class AppModule { }
