export interface IUser {
    id: number;
    companyId: number;
    name: string;
    username: string;
    designation: string;
    contactNo: string;
    emailId: string;
    role: 'Admin' | 'Non-Admin';
    status: 'active' | 'inactive';
    createdOn: string;
    quotations: string;
    mobileNumber: string;
    partsAssigned: number[]; // Array of part IDs assigned to the user
  }