export type UUID = string;

export interface ICompany {
  company_id: string;
  name: string;
  website: string;
  upto_validated_at: number;
  quotations_limits: number;
  type: 'free' | 'paid';
  status: 'active' | 'inactive';
  users_count: number;
  plants_count: number;
  machines_count: number;
  is_deleted: boolean;
  updated_at: number;
  created_at: number;
}