import z from "zod";

//This is zod variables used for backend
export const signUpInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})

export const signInInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export const createblogInput = z.object({
    title: z.string(),
    content: z.string()
})

export const updateblogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
})


//This is the zod types which is used in frontend
export type signupInput = z.infer<typeof signUpInput>
export type signinInput = z.infer<typeof signInInput>
export type createBlogInput = z.infer<typeof createblogInput>
export type updateBlogInput = z.infer<typeof updateblogInput>