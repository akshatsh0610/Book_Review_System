// src/ormconfig.ts
import { DataSource } from "typeorm";
import { Book } from "./entities/Book";
import { Review } from "./entities/Review";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "127.0.0.1",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "book_review",
  synchronize: false,
  logging: true,
  entities: [Book, Review],
  migrations: ["src/migrations/*.ts"],
});
