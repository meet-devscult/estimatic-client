export type UUID = string;

export interface Plant {
  id: UUID;
  companyId: UUID;
  name: string;
  location: string;
  area: string;
  machineCount: number;
}