import { z } from "zod";

export const CompanyCreationSchema = z.object({
    name: z.string(),
    website: z.string().url().optional(),
    numberOfQuotes: z.number(),
    companyType: z.string(),
    validUntil: z.date(),
})

export type TCompanyCreationSchema = z.infer<typeof CompanyCreationSchema>;

export const NewUserSchema = z.object({
    name: z.string(),
    designation: z.string(),
    phone: z.string(),
    type: z.string(),
    email: z.string().email({message: "Invalid email address"}),
    password: z.string(),
})

export type TNewUserSchema = z.infer<typeof NewUserSchema>;

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