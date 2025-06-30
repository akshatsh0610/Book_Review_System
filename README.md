# 📚 Book Review Backend API

A full-stack backend service built with **TypeScript**, **Express.js**, **GraphQL**, **PostgreSQL**, and **Redis**. This API allows users to manage a collection of books and their reviews. It implements caching with Redis and follows a modular, scalable architecture using TypeORM for database interaction.

---

## 🚀 Features

- Add and fetch books with reviews using GraphQL
- PostgreSQL database with TypeORM
- Redis caching for optimized reads
- Structured error handling and logging
- Unit and integration testing with Jest
- Flexible GraphQL schema with `express-graphql`
- Type-safe, production-ready backend using TypeScript

---

## 🧰 Tech Stack

| Layer          | Technology                 |
|----------------|----------------------------|
| Runtime        | Node.js, TypeScript        |
| Framework      | Express.js                 |
| Database       | PostgreSQL with TypeORM    |
| Caching        | Redis                      |
| API Layer      | GraphQL                    |
| Testing        | Jest                       |
| Dev Tools      | Docker, ts-node, nodemon   |

---

## ⚙️ Setup Instructions

### ✅ 1. Clone the Repository

```bash
git clone https://github.com/your-username/Book_Review_Backend.git
cd Book_Review_Backend
```

### ✅ 2. Install Dependencies

```bash
npm install
```

### ✅ 3. Create an `.env` file

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourPassword
DB_NAME=book_review
```

### ✅ 4. Run PostgreSQL and Redis Using Docker

**PostgreSQL**

```bash
docker run --name book-review-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=book_review -p 5432:5432 -d postgres
```

**Redis**

```bash
docker run --name book-review-redis -p 6379:6379 -d redis
```

Then run :

```bash
docker ps
```

### ✅ 5. Run Migrations

```bash
npm run typeorm -- migration:generate src/migrations/InitSchema --dataSource src/ormconfig.ts
npm run typeorm -- migration:run --dataSource src/ormconfig.ts
```

### ✅ 6. Start the Server

```bash
npm run dev
```
GraphQL playground will be available at:

`http://localhost:4000/graphql`

## GraphQL Queries

**1. Get all books**

```graphql
query {
  books {
    id
    title
    author
    reviews {
      id
      content
    }
  }
}
```
**2. Add a book**

```graphql
mutation {
  addBook(title: "1984", author: "George Orwell") {
    id
    title
    author
  }
}
```

**3. Add a review**

```graphql
mutation {
  addReview(bookId: 1, content: "Amazing read") {
    id
    content
    bookId
  }
}
```

**4. Get reviews of a book**

```graphql
query {
  reviews(bookId: 1) {
    id
    content
  }
}
```

## Running Tests

```bash
npm test
```

## Author 
- Name -: Akshat Sharma
- Email -: akshatsharma0610@gmail.com
