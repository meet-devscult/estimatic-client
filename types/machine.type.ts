export type UUID = string;

export interface IMachine {
  id: UUID;
  companyId: UUID;
  name: string;
  description: string;
  status: string;
  plant: string;
  addedBy: string;
  addedByRole: string;
  avgSetupTime: string;
  hourlyCost: number;
  machineType: string;
  machineCategory: string; // Machine Category Added
  manufacturer: string;
  spindleMaxRPM: number;
  efficiency: number;
  powerConsumption: number;
  powerConsumptionUnit: string;
  allowance: number;
  allowanceUnit: string;
  setupBaseTime: number;
  setupBaseTimeUnit: string;
  machineHourlyRate: number;
  machineHourlyRateUnit: string;
  setupHourRate: number;
  setupHourRateUnit: string;
  maxToolLength: number;
  maxToolLengthUnit: string;
  maxToolDiameter: number;
  maxToolDiameterUnit: string;
  maxTableLength: number;
  maxTableLengthUnit: string;
  maxTableBreadth: number;
  maxTableBreadthUnit: string;
  maxWorkpieceWeight: number;
  maxWorkpieceWeightUnit: string;
  toolChangeTime: number;
  toolChangeTimeUnit: string;
}