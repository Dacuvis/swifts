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

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}