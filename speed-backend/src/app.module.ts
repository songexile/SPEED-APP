import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { SubmissionSchema } from './submissions/schemas/submission.schema';
import { AnalystSchema } from './analyst/schemas/analyst.schema';
import { SubmissionsController } from './submissions/submissions.controller';
import { SubmissionsService } from './submissions/submissions.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
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
      { name: 'Submission', schema: SubmissionSchema },
      { name: 'Analyst', schema: AnalystSchema },
    ]),
    AuthModule, // Inject schema
  ],
  controllers: [AppController, SubmissionsController, AnalystController],
  providers: [AppService, SubmissionsService, AnalystService],
})
export class AppModule {}
