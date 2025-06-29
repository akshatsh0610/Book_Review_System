import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from "typeorm";
import { Book } from "./Book";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @Column()
  @Index() 
  bookId!: number;

  @ManyToOne(() => Book, book => book.reviews)
  book!: Book;
}
