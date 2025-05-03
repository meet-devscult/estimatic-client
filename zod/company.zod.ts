import { z } from "zod";

export const CompanyCreationSchema = z.object({
    name: z.string(),
    website: z.string().url().optional(),
    numberOfQuotes: z.number(),
    companyType: z.string(),
    validUntil: z.date(),
})

export type TCompanyCreationSchema = z.infer<typeof CompanyCreationSchema>;