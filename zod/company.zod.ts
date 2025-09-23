import { z } from "zod";

export const CompanyCreationSchema = z.object({
    name: z.string(),
    website: z.string().url().optional(),
    quotations_limits: z.number(),
    type: z.string(),
    upto_validated_at: z.number(),
})

export type TCompanyCreationSchema = z.infer<typeof CompanyCreationSchema>;