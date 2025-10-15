import { z } from "zod";

export const plantSchema = z.object({
    company_id: z.string().optional().nullable(),
    plant_id: z.string().optional().nullable(),
    name: z.string().min(1, {message: "Plant name is required"}),
})

export type TPlantSchema = z.infer<typeof plantSchema>;