# Books API

A RESTful API for managing a books collection, built with Elysia and Bun.

> **Status**: 🚧 Still in development

## Overview

This project provides a comprehensive API for managing books with 100+ books in the database. It supports full CRUD operations (Create, Read, Update, Delete) with batch creation support.

## Features

- ✅ Create single or multiple books at once
- ✅ Retrieve all books with search by title
- ✅ Get book details by ID
- ✅ Update book information
- ✅ Delete books
- 📚 100+ books already in the database

## Tech Stack

- **Runtime**: Bun
- **Framework**: Elysia
- **Database**: SQLite
- **Language**: TypeScript

## Installation

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

## API Endpoints

### Books

- `POST /books` - Create one or multiple books
- `GET /books` - List all books (supports `?title=search`)
- `GET /books/:id` - Get a specific book
- `PUT /books/:id` - Update a book
- `DELETE /books/:id` - Delete a book

## Example Requests

**Create a single book:**

```json
POST /books
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "publisher": "Scribner",
  "isbn": "978-0743273565",
  "category": "Fiction",
  "description": "A classic novel",
  "publishedYear": 1925,
  "stock": 5
}
```

**Create multiple books:**

```json
POST /books
[
  { "title": "Book 1", "author": "Author 1", ... },
  { "title": "Book 2", "author": "Author 2", ... }
]
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the MIT License - see [LICENSE.md](./LICENSE.md) for details.
