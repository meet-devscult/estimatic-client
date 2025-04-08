export interface IPart {
    id: number;
    companyId: number;
    name: string;
    status: 'Ongoing' | 'Estimated' | 'Completed';
    type: 'Drawing' | 'CAD Model';
    material: string;
    materialType: string;
    time: number;
    timeUnit: string;
    cost: number;
    costUnit: string;
    createdOn: string;
  }
  