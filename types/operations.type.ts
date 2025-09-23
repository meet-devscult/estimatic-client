export type UUID = string;

export interface IOperation {
  operation_id: string;
  machine_name: string;
  operation: string;
  inputs: string;
  time_per_piece_min: number;
  cost_per_piece: number;
}