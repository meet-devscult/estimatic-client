export type UUID = string;

export interface IUser {
  user_id: string;
  user_name: string;
  company_id: string;
  company_name: string;
  designation: string;
  phone_number: string;
  email: string;
  password: string;
  role: string;
  type: 'admin' | 'non-admin';
  status: 'active' | 'inactive';
  created_at: number; // Epoch
  is_deleted: boolean;
}

export enum PERMISSION {
  FULL_ACCESS = 'full_access',
  VIEW_ONLY = 'view_only',
  RESTRICTED = 'restricted',
}
export type PERMISSIONS = {
  dashboard: PERMISSION;
  companies: PERMISSION;
  transactions: PERMISSION;
  enquiries: PERMISSION;
  roles: PERMISSION;
};