export interface CreateBookDTO {
  title: string;
  author: string;
  publisher: string;

  isbn?: string;
  category: string;

  description?: string;

  publishedYear: number;

  stock: number;
}

export type UpdateBookDTO = Partial<CreateBookDTO>;