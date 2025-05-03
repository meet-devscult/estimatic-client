import { z } from "zod";

export const newMachineSchema = z.object({
    // basic information
    plantName: z.string(),
    machineName: z.string(),
    machineType: z.string(),
    machineCategory: z.string(),
    machineManufacturer: z.string(),
    spindleMaxRPM: z.number(),
    efficiency: z.number(),
    powerConsumption: z.number(),

    // machine specifications
    allowance: z.number(),
    setupBaseTime: z.number(),

    // machine rates
    ratePerHour: z.number(),
    setupRatePerHour: z.number(),

    maxToolLength: z.number().optional(),
    maxToolDiameter: z.number().optional(),
    maxTableLength: z.number().optional(),
    maxTableBreadth: z.number().optional(),
    maxWorkpieceWeight: z.number().optional(),
    toolChangeTime: z.number().optional(),
})

export type TNewMachineSchema = z.infer<typeof newMachineSchema>;