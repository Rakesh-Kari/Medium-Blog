import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signUpInput, signInInput } from '@karirakesh/medium-common-updating'

const prisma = new PrismaClient()
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();

userRouter.post('/signup' , async (c) => {
    const body = await c.req.json();
    const {success} = signUpInput.safeParse(body);
    console.log(success)
    if(!success) {
        c.status(400);
        return c.json({err: "Incorrect input validations"})
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
        }
      })
  
      const token = await sign({id: user.id}, c.env.JWT_SECRET) 
      return c.json(token)
    } catch(e) {
      c.status(411);
      return c.json({error: "error while signing up"})
    }
})
  
userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    const {success} = signInInput.safeParse(body);
    console.log(success)
    if(!success) {
        c.status(400);
        return c.json({err: "Incorrect input validations"})
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const User = await prisma.user.findFirst({
        where: {
            email: body.email,
            password: body.password
        }
        })
        if(!User) {
            c.status(400);
            return c.json({error: "User not found"});
        }

        const token = sign({id: User.id}, c.env.JWT_SECRET);
        return c.json(token)
    } catch(err) {
        c.status(411);
        return c.json({error: "Invalid"})
    }
})