export type UUID = string;

export interface IPart {
  id: UUID;
  name: string;
  status: string;
  type: string;
  material: string;
  materialType: string;
  time: number;
  timeUnit: string;
  cost: number;
  costUnit: string;
  createdOn: number;
  companyId: UUID;
  userId: UUID;
  shape: string;
  diameter?: number;
  diameterUnit?: string;
  length?: number;
  lengthUnit?: string;
  width?: number;
  widthUnit?: string;
  thickness?: number;
  thicknessUnit?: string;
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
