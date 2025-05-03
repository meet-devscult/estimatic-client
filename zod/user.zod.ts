import { z } from "zod";


// "user_id": "c35fbfa5-a196-4691-8f69-7470629eb549",
// "user_name": "robert_brown",
// "designation": "COO",
// "phone_number": "+1987654322",
// "email": "robert.brown.v2@betasolutions.io",
// "password": "CTOStrongPass@2025",
// "type": "non-admin",
// "status": "active"

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