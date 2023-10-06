import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  // GET ARTICLE BY ID
  it('/submissions/65192b759bb31ac640773f4a (GET)', () => {
    return request(app.getHttpServer())
      .get('/submissions/65192b759bb31ac640773f4a')
      .expect(200)
      .expect({
        "_id": "65192b759bb31ac640773f4a",
        "title": "Atomic Habits",
        "authors": "James Clear",
        "journal": "Habits",
        "year": 2018,
        "volume": "1",
        "pages": "250",
        "doi": "18/08/23",
        "__v": 0
      });
  });
});
