import { booksService } from "./books.service";
import type { CreateBookDTO, UpdateBookDTO, PaginationParams } from "./books.type";

export const booksController = {
  create({ body }: { body: CreateBookDTO | CreateBookDTO[] }) {
    return booksService.create(body);
  },

  findAll({ query }: { query: { title?: string; page?: string; limit?: string } }) {
    const pagination: PaginationParams = {
      page: query.page ? parseInt(query.page) : 1,
      limit: query.limit ? parseInt(query.limit) : 10
    };
    return booksService.findAll({ title: query.title }, pagination);
  },

  findById({ params, query }: { params: { id: string }, query?: { page?: string; limit?: string } }) {
    const pagination: PaginationParams = {
      page: query?.page ? parseInt(query.page) : 1,
      limit: query?.limit ? parseInt(query.limit) : 10
    };
    return booksService.findById(Number(params.id), pagination);
  },

  update({ params, body }: { params: { id: string }, body: UpdateBookDTO }) {
    return booksService.update(Number(params.id), body);
  },

  delete({ params }: { params: { id: string } }) {
    return booksService.delete(Number(params.id));
  }
};
