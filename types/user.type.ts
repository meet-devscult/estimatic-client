export type UUID = string;

export interface User {
  id: UUID;
  companyId: UUID;
  name: string;
  designation: string;
  contactNo: string;
  emailId: string;
  role: 'Admin' | 'Non-Admin';
  status: string;
  createdOn: number; // Epoch
  quotations: string;
  mobileNumber: string;
  partsAssigned: UUID[];
}