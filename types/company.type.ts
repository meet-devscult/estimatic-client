export type UUID = string;

export interface ICompany {
  id: UUID;
  companyName: string;
  status: string;
  users: number;
  quotationsStatus: string;
  type: 'Free' | 'Paid';
  plants: number;
  machines: number;
  website: string;
  createdOn: number; // Epoch
  validUpto: number; // Epoch
}