// import request from 'supertest';
import { AppDataSource } from '../ormconfig';
import { redis } from '../redis';
import { Book } from '../entities/Book';
import { Review } from '../entities/Review';
import { root } from '../resolver';

beforeAll(async () => {
  await AppDataSource.initialize();
  await AppDataSource.synchronize(true); // creates tables

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.query('TRUNCATE TABLE "review" CASCADE');
  await queryRunner.query('TRUNCATE TABLE "book" CASCADE');
  await queryRunner.release();
});


afterAll(async () => {
  await AppDataSource.destroy();
});

describe('Integration Test: cache-miss', () => {
  it('fetches books from DB if cache miss and updates cache', async () => {
    // Clear Redis
    await redis.del('books');

    // Insert a book into DB
    await AppDataSource.getRepository(Book).save({ title: 'DB Book', author: 'Author DB' });

    const result = await root.books();

    expect(result.length).toBeGreaterThan(0);
    const cached = await redis.get('books');
    expect(JSON.parse(cached || '[]').length).toBeGreaterThan(0);
  });
});
