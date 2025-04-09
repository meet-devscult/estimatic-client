export interface IPart {
  id: number;
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
  companyId: number;
  userId: number; // ID of the user assigned to this part
  shape: string;
  diameter?: number;
  diameterUnit?: string;
  length?: number;
  lengthUnit?: string;
  width?: number;
  widthUnit?: string;
  thickness?: number;
  thicknessUnit?: string;
  height?: number;
  heightUnit?: string;
  scrapCost: string;
  grossWeight: number;
  grossWeightUnit: string;
  netWeight: number;
  netWeightUnit: string;
  noOfLots: number;
  stockPerLot: number;
  materialCost: number;
  materialCostUnit: string;
  tolerancePercent: number;
}
