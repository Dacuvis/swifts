import { booksController } from "./books.controller";
import { Elysia, t } from "elysia";

export const booksRouter = new Elysia({prefix: "/books"}).post("/", booksController.create, {
  body: t.Union([
    t.Object({
      title: t.String(),
      author: t.String(),
      publisher: t.String(),
      isbn: t.Optional(t.String()),
      category: t.String(),
      description: t.Optional(t.String()),
      publishedYear: t.Number(),
      stock: t.Number(),
    }),
    t.Array(t.Object({
      title: t.String(),
      author: t.String(),
      publisher: t.String(),
      isbn: t.Optional(t.String()),
      category: t.String(),
      description: t.Optional(t.String()),
      publishedYear: t.Number(),
      stock: t.Number(),
    }))
  ])
})
  .get("/", booksController.findAll)
  .get("/:id", booksController.findById)
  .put("/:id", booksController.update, {
    body: t.Object({
      title: t.Optional(t.String()),
      author: t.Optional(t.String()),
      publisher: t.Optional(t.String()),
      isbn: t.Optional(t.String()),
      category: t.Optional(t.String()),
      description: t.Optional(t.String()),
      publishedYear: t.Optional(t.Number()),
      stock: t.Optional(t.Number()),
    }),
  })
  .delete("/:id", booksController.delete)