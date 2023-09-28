/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { BooksService } from './books/books.service';
import { BooksController } from './books/books.controller';
import { BookSchema } from './books/schemas/book.schema';
import { SubmissionSchema } from './submissions/schemas/submission.schema';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubmissionsController } from './submissions/submissions.controller';
import { SubmissionsService } from './submissions/submissions.service';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]), // Inject schema
    MongooseModule.forFeature([
      { name: 'Submission', schema: SubmissionSchema },
    ]), // Inject schema
  ],
  controllers: [AppController, BooksController, SubmissionsController],
  providers: [AppService, BooksService, SubmissionsService],
})
export class AppModule {}
