import { z } from "zod";

export const transactionSchema = z.object({
    company_id: z.string().nullable(),
    transaction_id: z.string().nullable(),
    company_name: z.string(),
    paid_time: z.number(),
    amount: z.number(),
    upto_validated_at: z.number(),
    payment_mode: z.string(),
    plan: z.string(),
    reason: z.string(),
});

export type TTransactionFormType = z.infer<typeof transactionSchema>;
