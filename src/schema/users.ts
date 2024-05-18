import { z } from "zod";

export const SignUpSchema = z.object({
    name: z.string({ required_error: "Name is required" }).trim().min(3, { message: "Name must be at least 3 chars." }).max(255, { message: "Name must not be more than 255 characters" }),
    email: z.string({ required_error: "Email is required" }).email(),
    password: z.string({ required_error: "Password is required" }).min(8, { message: "Password must be at least 8 characters long" }),
})

export const SignInSchema = z.object({
    email: z.string({ required_error: "Email is required" }).email(),
    password: z.string({ required_error: "Password is required" }).min(8, { message: "Password must be at least 8 characters long" }),
})
