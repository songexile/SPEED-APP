import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { SubmissionSchema } from './submissions/schemas/submission.schema';
import { SubmissionsController } from './submissions/submissions.controller';
import { SubmissionsService } from './submissions/submissions.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      { name: 'Submission', schema: SubmissionSchema },
    ]), AuthModule, // Inject schema
  ],
  controllers: [AppController, SubmissionsController],
  providers: [AppService, SubmissionsService],
})
export class AppModule { }
