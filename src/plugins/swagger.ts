import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";

export const docsRoute = new Elysia()
  .use(
    swagger({
      path: "/docs",
      documentation: {
        info: {
          title: "Books API",
          version: "1.0.0",
          description: "REST API untuk mengelola data buku.",
          contact: {
            name: "Rayyan Irfansya",
            email: "rayyan@example.com",
          },
          license: {
            name: "MIT",
          },
        },
      },
    })
  )