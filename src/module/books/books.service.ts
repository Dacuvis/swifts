import { booksModel } from './books.model';
import type {
  CreateBookDTO,
  UpdateBookDTO,
  PaginationParams,
} from './books.type';
import { BadRequestError } from '../../error/bad-request';

export const booksService = {
  create: (data: CreateBookDTO | CreateBookDTO[]) => {
    const books = Array.isArray(data) ? data : [data];
    books.forEach((book) => {
      if (book.stock < 0) {
        throw new BadRequestError('Stock must be greater than or equal to 0');
      }

      const duplicateCheck = booksModel.checkDuplicate(book);
      if (duplicateCheck.exists) {
        throw new BadRequestError(
          duplicateCheck.message || 'Book already exists'
        );
      }
    });

    return booksModel.create(data);
  },

  findAll: (query: { title?: string }, pagination?: PaginationParams) => {
    return booksModel.findAll(query, pagination);
  },

  findById: (id: number, pagination?: PaginationParams) => {
    const result = booksModel.findById(id, pagination);
    if (!result.data || result.data.length === 0) {
      throw new BadRequestError('Book not found');
    }
    return result;
  },

  update: (id: number, data: UpdateBookDTO) => {
    if (data.stock !== undefined && data.stock < 0) {
      throw new BadRequestError('Stock must be greater than or equal to 0');
    }

    const existing = booksModel.findById(id);
    if (!existing || existing.data.length === 0) {
      throw new BadRequestError('Book not found');
    }

    booksModel.update(id, data);
    const result = booksModel.findById(id);
    return result.data[0];
  },

  delete: (id: number) => {
    const existing = booksModel.findById(id);
    if (!existing || existing.data.length === 0) {
      throw new BadRequestError('Book not found');
    }
    booksModel.delete(id);
    return { success: true };
  },
};
