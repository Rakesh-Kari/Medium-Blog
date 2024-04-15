import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';
import { createblogInput, updateblogInput } from '@karirakesh/medium-common-updating';

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }, Variables: {
    userId: string;
  }
}>();

blogRouter.use('/*', async (c, next) =>{
    const authHeader = c.req.header("authorization") || "";
    const token = authHeader.split(" ")[1]
    console.log(token);

    try {
        const user = await verify(token ,c.env.JWT_SECRET);
        console.log(user);
        if(user) {
            c.set("userId", user.id);
            await next();
        } else {
            c.status(411);
            return c.json({message: "You are not logged in"})
        }
    } catch(err) {
        c.status(411);
        return c.json({message: "Unauthorized token"})
    }
})

blogRouter.post('/', async (c) => {
    const body = await c.req.json();

    const { success } = createblogInput.safeParse(body);
    if(!success) {
        c.status(400);
        return c.json({err: "Wrong input validations"})
    }
    const userId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    console.log("checking");
    try {
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId,
            }
        })
    
        return c.json({id: blog.id})
    } catch(err) {
        c.status(500);
        return c.json({err: "Internal Server Error"})
    }
})
  
blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const { success } = updateblogInput.safeParse(body);
    if(!success) {
        c.status(400);
        return c.json({err: "Wrong input validations"})
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.post.update({
        where: {
            id: body.id,
        }, data: {
            title: body.title,
            content: body.content,
        }
    })

    return c.text('Updating bloging')
})

blogRouter.get('/bulk', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    try {
        const blogs = await prisma.post.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true,
                    }
                }
            }
        });
        return c.json({blogs})
    } catch ( err) {
        c.status(411);
        return c.json({message: "Somehting went wrong"})
    }
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: id
            }, select: {
                title: true,
                content: true,
                id:true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json({blog});
    } catch(err) {
        c.status(411);
        return c.json({ err: "Error while fetching the data"})
    }
    
})

