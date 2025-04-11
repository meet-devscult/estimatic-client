import { z } from "zod";

export const companyCreationSchema = z.object({
    name: z.string().min(1),
    website: z.string().url().optional(),
    numberOfQuotes: z.number().min(1, {message: "Number of quotes must be at least 1"}),
    companyType: z.string(),
    validUntil: z.date(),
})

export type TCompanyCreationSchema = z.infer<typeof companyCreationSchema>;

export const newUserSchema = z.object({
    name: z.string(),
    designation: z.string(),
    phone: z.string(),
    type: z.string(),
    email: z.string(),
    password: z.string(),
})

export type TNewUserSchema = z.infer<typeof newUserSchema>;

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

    // optional fields
    maxToolLength: z.number().optional(),
    maxToolDiameter: z.number().optional(),
    maxTableLength: z.number().optional(),
    maxTableBreadth: z.number().optional(),
    maxWorkpieceWeight: z.number().optional(),
    toolChangeTime: z.number().optional(),
})

export type TNewMachineSchema = z.infer<typeof newMachineSchema>;