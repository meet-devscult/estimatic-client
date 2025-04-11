import { z } from "zod";

export const transactionSchema = z.object({
    name: z.string(),
    paidDate: z.date(),
    amount: z.number(),
    validUntil: z.string(),
    paymentMethod: z.string(),
    paidFor: z.string(),
});

export type TTransactionFormType = z.infer<typeof transactionSchema>;
