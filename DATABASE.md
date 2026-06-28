# Database Documentation

## Overview

The Books API uses **SQLite** as its database, which is lightweight, serverless, and perfect for this project. The database file is `database.sqlite` and is automatically created on first run.

## Database Schema

### Books Table

```sql
CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  publisher TEXT NOT NULL,
  isbn TEXT,
  category TEXT NOT NULL,
  description TEXT,
  published_year INTEGER NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0
)
```

**Columns:**

| Column           | Type    | Description                           |
| ---------------- | ------- | ------------------------------------- |
| `id`             | INTEGER | Primary key, auto-incremented         |
| `title`          | TEXT    | Book title (required)                 |
| `author`         | TEXT    | Author name (required)                |
| `publisher`      | TEXT    | Publisher name (required)             |
| `isbn`           | TEXT    | ISBN number (optional)                |
| `category`       | TEXT    | Book category (required)              |
| `description`    | TEXT    | Book description (optional)           |
| `published_year` | INTEGER | Year of publication (required)        |
| `stock`          | INTEGER | Number of books in stock (default: 0) |

## Initialization

The database is automatically initialized on application startup through `src/database/init.ts`.

### Manual Initialization

To manually initialize the database:

```bash
bun run start
```

Or if you have a specific command:

```bash
bun run db:init
```

## Data Operations

### Create Books

**Single book:**

```javascript
POST /books
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "publisher": "Scribner",
  "isbn": "978-0743273565",
  "category": "Fiction",
  "description": "A classic novel of the Jazz Age",
  "publishedYear": 1925,
  "stock": 5
}
```

**Batch (multiple books):**

```javascript
POST /books
[
  { "title": "Book 1", "author": "Author 1", ... },
  { "title": "Book 2", "author": "Author 2", ... }
]
```

### Read Books

**Get all books:**

```javascript
GET / books;
```

**Search by title:**

```javascript
GET /books?title=gatsby
```

**Get specific book:**

```javascript
GET /books/:id
```

### Update Books

```javascript
PUT /books/:id
{
  "stock": 10,
  "description": "Updated description"
}
```

### Delete Books

```javascript
DELETE /books/:id
```

## Database File Location

- **Development**: `./database.sqlite` (in project root)
- **Docker**: `/app/database.sqlite` (in container)

## Backup and Restore

### Backup

```bash
# Copy the database file
cp database.sqlite database.backup.sqlite
```

### Restore

```bash
# Restore from backup
cp database.backup.sqlite database.sqlite
```

## Querying the Database Directly

To query the database directly using SQLite CLI:

```bash
sqlite3 database.sqlite
```

Example queries:

```sql
-- List all books
SELECT * FROM books;

-- Count total books
SELECT COUNT(*) as total FROM books;

-- Find books by author
SELECT * FROM books WHERE author LIKE '%Fitzgerald%';

-- Find low stock books
SELECT * FROM books WHERE stock < 5;

-- Total stock value
SELECT SUM(stock) as total_stock FROM books;
```

## Performance Considerations

- The database uses INTEGER PRIMARY KEY for efficient lookups
- The title search uses LIKE with wildcards for flexibility
- Consider adding indices if querying grows significantly

## Future Enhancements

- ✅ Search by author, category, ISBN
- ✅ Pagination for large result sets
- ✅ Database migrations system
- ✅ Query optimization and indexing
