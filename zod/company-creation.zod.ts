import { z } from "zod";

export const companyCreationSchema = z.object({
    name: z.string().min(1, {message: "Company name is required"}),
    website: z.string().url().optional(),
    numberOfQuotes: z.number().min(1, {message: "Number of quotes must be at least 1"}),
    companyType: z.string().min(1, {message: "Company type is required"}),
    validUntil: z.date().min(new Date(), {message: "Valid until date must be in the future"}),
})

export type TCompanyCreationSchema = z.infer<typeof companyCreationSchema>;

export const newUserSchema = z.object({
    name: z.string().min(1, {message: "Name is required"}),
    designation: z.string().min(1, {message: "Designation is required"}),
    phone: z.string().min(1, {message: "Phone number is required"}),
    type: z.string().min(1, {message: "User type is required"}),
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(8, {message: "Password must be at least 8 characters long"}),
})

export type TNewUserSchema = z.infer<typeof newUserSchema>;

export const newMachineSchema = z.object({
    // basic information
    plantName: z.string().min(1, {message: "Plant name is required"}),
    machineName: z.string().min(1, {message: "Machine name is required"}),
    machineType: z.string().min(1, {message: "Machine type is required"}),
    machineCategory: z.string().min(1, {message: "Machine category is required"}),
    machineManufacturer: z.string().min(1, {message: "Machine manufacturer is required"}),
    spindleMaxRPM: z.number().min(1, {message: "Spindle max RPM is required"}),
    efficiency: z.number().min(1, {message: "Efficiency is required"}),
    powerConsumption: z.number().min(1, {message: "Power consumption is required"}),    

    // machine specifications
    allowance: z.number().min(1, {message: "Allowance is required"}),
    setupBaseTime: z.number().min(1, {message: "Setup base time is required"}),

    // machine rates
    ratePerHour: z.number().min(1, {message: "Rate per hour is required"}),
    setupRatePerHour: z.number().min(1, {message: "Setup rate per hour is required"}),

    // optional fields
    maxToolLength: z.number().optional(),
    maxToolDiameter: z.number().optional(),
    maxTableLength: z.number().optional(),
    maxTableBreadth: z.number().optional(),
    maxWorkpieceWeight: z.number().optional(),
    toolChangeTime: z.number().optional(),
})

export type TNewMachineSchema = z.infer<typeof newMachineSchema>;