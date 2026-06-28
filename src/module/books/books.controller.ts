import { booksService } from "./books.service";
import type { CreateBookDTO, UpdateBookDTO } from "./books.type";

export const booksController = {
  create({ body }: { body: CreateBookDTO | CreateBookDTO[] }) {
    return booksService.create(body);
  },

  findAll({ query }: { query: { title?: string } }) {
    return booksService.findAll(query);
  },

  findById({ params }: { params: { id: string } }) {
    return booksService.findById(Number(params.id));
  },

  update({ params, body }: { params: { id: string }, body: UpdateBookDTO }) {
    return booksService.update(Number(params.id), body);
  },

  delete({ params }: { params: { id: string } }) {
    return booksService.delete(Number(params.id));
  }
};
