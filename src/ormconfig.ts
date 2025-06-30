// src/ormconfig.ts
import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
import { Book } from "./entities/Book";
import { Review } from "./entities/Review";
dotenv.config();
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [Book, Review],
  migrations: ["src/migrations/*.ts"],
});
