import { z } from "zod";

export const newMachineSchema = z.object({
    company_id: z.string().nullable(),
    machine_id: z.string().nullable(),
        
    // basic information
    plant_name: z.string(),
    name: z.string(),
    type: z.string(),
    category: z.string(),
    manufacturer: z.string(),
    max_rpm: z.number(),
    efficiency: z.number(),
    power_consumption: z.number(),
    status: z.string().optional(),

    // machine specifications
    allowance: z.number(),
    setup_base_time: z.number(),

    // machine rates
    machine_rate: z.number(),
    setup_hour_rate: z.number(),

    max_tool_length: z.number().optional(),
    max_tool_diameter: z.number().optional(),
    max_table_length: z.number().optional(),
    max_table_breadth: z.number().optional(),
    max_workpiece_weight: z.number().optional(),
    tool_change_time: z.number().optional(),
})

export type TNewMachineSchema = z.infer<typeof newMachineSchema>;