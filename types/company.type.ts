// ==============================

export interface ICompany {
    id: number;
    companyName: string;
    status: 'active' | 'inactive';
    users: number;
    quotationsStatus: string;
    type: 'Free' | 'Paid';
    plants: number;
    machines: number;
    website: string;
    createdOn: string;
    validUpto: string;
  }
  