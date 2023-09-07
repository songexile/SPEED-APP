/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { BooksService } from './books/books.service';
import { BooksController } from './books/books.controller';
import { BookSchema } from './books/schemas/book.schema';

import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]), // Inject schema
  ],
  controllers: [AppController, BooksController],
  providers: [AppService, BooksService],
})
export class AppModule { }
