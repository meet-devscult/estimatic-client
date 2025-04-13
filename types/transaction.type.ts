export type UUID = string;

export interface ITransaction {
  id: UUID;
  companyId: UUID;
  name: string;
  amount: number;
  currency: string;
  datePaid: number; // Epoch
  validUntil: number; // Epoch
  paidVia: 'UPI' | 'Cash' | 'Cheque' | 'Bank Transfer';
  paidFor: 'Free' | 'Paid';
  paymentMethod?: string;
}


export type TCreateTransaction = Omit<ITransaction, 'id' | 'companyId' | 'currency'>
  