import { AppDataSource } from "./ormconfig";
import { Book } from "./entities/Book";
import { Review } from "./entities/Review";
import { redis } from "./redis";

export const root = {
  books: async () => {
    const cacheKey = 'books';

    try {
      const cached = await redis.get(cacheKey);
      if (cached) {
        console.log("Fetched from Redis");
        return JSON.parse(cached);
      }
    } catch (err) {
      console.error("Redis read error:", err);
    }

    const books = await AppDataSource.getRepository(Book).find({
      relations: ["reviews"]
    });

    try {
      await redis.set(cacheKey, JSON.stringify(books), 'EX', 3600); // cache for 1 hour
      console.log("Redis cache updated");
    } catch (err) {
      console.error("Redis write error:", err);
    }

    return books;
  },

  addBook: async ({ title, author }: { title: string; author: string }) => {
    const book = AppDataSource.getRepository(Book).create({ title, author });
    const savedBook = await AppDataSource.getRepository(Book).save(book);

    // Invalidate cache
    try {
      await redis.del("books");
      console.log("Redis cache cleared on addBook");
    } catch (err) {
      console.error("Redis clear error:", err);
    }

    return savedBook;
  },

  reviews: async ({ bookId }: { bookId: number }) => {
    return await AppDataSource.getRepository(Review).find({ where: { bookId } });
  },

  addReview: async ({ bookId, content }: { bookId: number; content: string }) => {
    const review = AppDataSource.getRepository(Review).create({ bookId, content });
    return await AppDataSource.getRepository(Review).save(review);
  }
};
