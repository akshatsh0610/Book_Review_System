import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type Book {
    id: Int!
    title: String!
    author: String!
    reviews: [Review]
  }

  type Review {
    id: Int!
    bookId: Int!
    content: String!
  }

  type Query {
    books: [Book]
    reviews(bookId: Int!): [Review]
  }

  type Mutation {
    addBook(title: String!, author: String!): Book
    addReview(bookId: Int!, content: String!): Review
  }
`);
