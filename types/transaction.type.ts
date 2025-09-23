export type UUID = string;

export interface ITransaction {
  transaction_id : string,
  company_id : string,
  company_name : string,
  paid_time: number,
  upto_validated_at: number,
  amount: number,
  payment_mode : string,
  plan : string,
  reason : string,
  is_deleted: boolean,
}

  