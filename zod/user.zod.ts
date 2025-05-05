import { z } from "zod";

export const NewUserSchema = z.object({
    company_id: z.string().nullable(),
    user_id: z.string().nullable(),
    user_name: z.string(),
    designation: z.string(),
    phone_number: z.string(),
    type: z.string(),
    email: z.string().email({message: "Invalid email address"}),
    password: z.string(),
    status: z.string().optional(),
})

export type TNewUserSchema = z.infer<typeof NewUserSchema>;