export interface IMachine {
    id: number;
    companyId: number;
    name: string;
    description: string;
    status: 'active' | 'inactive';
    plant: string;
    addedBy: string;
    addedByRole: string;
    avgSetupTime: string;
    hourlyCost: number;
  }
  