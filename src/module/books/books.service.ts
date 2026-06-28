import { booksModel } from "./books.model";
import type { CreateBookDTO, UpdateBookDTO } from "./books.type";
import { BadRequestError } from "../../error/bad-request";

export const booksService = {
  create: (data: CreateBookDTO | CreateBookDTO[]) => {
    const books = Array.isArray(data) ? data : [data];
    books.forEach(book => {
      if (book.stock < 0) {
        throw new BadRequestError("Stock must be greater than or equal to 0");
      }
    });

    return booksModel.create(data);
  },

  findAll: (query: { title?: string }) => {
    return booksModel.findAll(query);
  },

  findById: (id: number) => {
    const book = booksModel.findById(id);
    if (!book) {
      throw new BadRequestError("Book not found");
    }
    return book;
  },

  update: (id: number, data: UpdateBookDTO) => {
    if (data.stock !== undefined && data.stock < 0) {
      throw new BadRequestError("Stock must be greater than or equal to 0");
    }

    const existing = booksModel.findById(id);
    if (!existing) {
      throw new BadRequestError("Book not found");
    }

    booksModel.update(id, data);
    return booksModel.findById(id);
  },

  delete: (id: number) => {
    const existing = booksModel.findById(id);
    if (!existing) {
      throw new BadRequestError("Book not found");
    }
    booksModel.delete(id);
    return { success: true };
  }
}