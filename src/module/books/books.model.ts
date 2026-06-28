import { db } from "../../config/database";
import type { CreateBookDTO, UpdateBookDTO } from "./books.type";

export const booksModel = {
  create: (data: CreateBookDTO | CreateBookDTO[]) => {
    const books = Array.isArray(data) ? data : [data];
    books.forEach(book => {
      const { title, author, publisher, isbn, category, description, publishedYear, stock } = book;
      db.run("INSERT INTO books (title, author, publisher, isbn, category, description, published_year, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [title, author, publisher, isbn ?? null, category, description ?? null, publishedYear, stock]);
    });
  },

  findAll: (query: { title?: string }) => {
    const { title } = query
    let sql = "SELECT * FROM books"
    let params: any[] = []

    if (query.title) {
        sql += " WHERE title LIKE ?";
        params.push(`%${query.title}%`);
    }

    return db.query(sql).all(...params)
  },

  findById: (id: number) => {
    const sql = "SELECT * FROM books WHERE id = ?"
    const rows = db.query(sql).all(id)
    return rows && rows.length ? rows[0] : undefined
  },

  update: (id: number, data: UpdateBookDTO) => {
    const fields: string[] = []
    const params: any[] = []

    if (data.title !== undefined) {
      fields.push("title = ?"); params.push(data.title)
    }
    if (data.author !== undefined) {
      fields.push("author = ?"); params.push(data.author)
    }
    if (data.publisher !== undefined) {
      fields.push("publisher = ?"); params.push(data.publisher)
    }
    if (data.isbn !== undefined) {
      fields.push("isbn = ?"); params.push(data.isbn ?? null)
    }
    if (data.category !== undefined) {
      fields.push("category = ?"); params.push(data.category)
    }
    if (data.description !== undefined) {
      fields.push("description = ?"); params.push(data.description ?? null)
    }
    if (data.publishedYear !== undefined) {
      fields.push("published_year = ?"); params.push(data.publishedYear)
    }
    if (data.stock !== undefined) {
      fields.push("stock = ?"); params.push(data.stock)
    }

    if (fields.length === 0) return;

    params.push(id)
    const sql = `UPDATE books SET ${fields.join(", ")} WHERE id = ?`
    db.run(sql, params)
  },

  delete: (id: number) => {
    db.run("DELETE FROM books WHERE id = ?", [id])
  }
}