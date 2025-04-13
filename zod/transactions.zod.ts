import { z } from "zod";

export const transactionSchema = z.object({
    name: z.string(),
    datePaid: z.date(),
    amount: z.number(),
    validUntil: z.date(),
    paidVia: z.enum(['UPI', 'Cash', 'Cheque', 'Bank Transfer']),
    paidFor: z.enum(['Free', 'Pro']),
});

export type TTransactionFormType = z.infer<typeof transactionSchema>;
