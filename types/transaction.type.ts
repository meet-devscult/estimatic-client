export interface ITransaction {
    id: number;
    companyId: number;
    name: string;
    datePaid: string;
    amount: number;
    currency: string;
    validUntil: string;
    paidVia: 'UPI' | 'Cash' | 'Cheque' | 'Bank Transfer';
    paidFor: string;
  }
  