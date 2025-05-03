export type UUID = string;

export interface IMachine {
  machine_id: string;
  company_id: string;
  company_name: string;
  user_id: string;
  user_name: string;
  plant_name: string;
  name: string;
  type: string;
  category: string;
  manufacturer: string;
  max_rpm: number;
  efficiency: number;
  power_consumption: number;
  allowance: number;
  setup_base_time: number;
  machine_rate: number;
  setup_hour_rate: number;
  max_tool_length: number;
  max_tool_diameter: number;
  max_table_length: number;
  max_table_breadth: number;
  max_workpiece_weight: number;
  tool_change_time: number;
  created_at: number;
  is_deleted: boolean;
}

export enum MachineType {
  DRILLING = 'Drilling',
  TURNING = 'Turning',
  MILLING = 'Milling',
  GRINDING = 'Grinding',
  BORING = 'Boring',
  BROACHING = 'Broaching',
  SAWING = 'Sawing',
}

export enum MachineCategory {
  THREE_AXIS_CNC = '3 Axis CNC',
  FOUR_AXIS_CNC = '4 Axis CNC',
  FIVE_AXIS_CNC = '5 Axis CNC',
  SIX_AXIS_CNC = '6 Axis CNC',
  VERTICAL_MACHINING_CENTER = 'Vertical Machining Center',
  HORIZONTAL_MACHINING_CENTER = 'Horizontal Machining Center',
  CNC_LATHE = 'CNC Lathe',
  CNC_SWISS_LATHE = 'CNC Swiss Lathe',
  CNC_ROUTER = 'CNC Router',
  CNC_GRINDING_MACHINE = 'CNC Grinding Machine',
  CNC_BROACHING_MACHINE = 'CNC Broaching Machine',
  CNC_BANDSAW_MACHINE = 'CNC Bandsaw Machine',
  CNC_COLD_SAW_MACHINE = 'CNC Cold Saw Machine',
}