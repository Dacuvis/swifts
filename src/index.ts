import { logger } from "@bogeychan/elysia-logger";
import { initDatabase } from "./database/init";
import { Elysia } from "elysia";
import cors from "@elysiajs/cors";
import { rateLimit } from "elysia-rate-limit";
import { docsRoute } from "./plugins/swagger";
import { booksRouter } from "./module/books/books.route";

initDatabase()

const app = new Elysia()
  .use(logger())
  .use(cors())
  .use(rateLimit({
    max: 100,
    duration: 60000
  }))
  .use(docsRoute)
  .use(booksRouter)
  .listen(3000, () => {
    console.log("Server is running on port 3000");
  });

