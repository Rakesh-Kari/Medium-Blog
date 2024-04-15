import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors';

const prisma = new PrismaClient()
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
    email: string,
    password: string
  }
}>();

app.use('/api/*', cors())
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter)

export default app
