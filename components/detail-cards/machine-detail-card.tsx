import { cn } from "@/lib/utils"
import { IMachine } from "@/types/machine.type"
import { PencilIcon } from "lucide-react"
import { Button } from "../ui/button"

interface MachineDetailCardProps {
    machine: IMachine
}
export default function MachineDetailCard({ machine }: MachineDetailCardProps) {

    const section1 = [
        {
            label: "Name",
            value: machine.name
        },
        {
            label: "Plant",
            value: machine.plant
        },
        {
            label: "Machine Type",
            value: machine.machineType
        },
        {
            label: "Machine",
            value: machine.machineType
        },
        {
            label: "Manufacturer",
            value: machine.manufacturer
        },
        {
            label: "Spindle Max RPM",
            value: machine.spindleMaxRPM
        },
        {
            label: "Efficiency %",
            value: machine.efficiency
        },
        {
            label: "Power Consumption (KW/hour)",
            value: machine.powerConsumption
        }
    ]

    const section2 = [
        {
            label: "Status",
            value: machine.status
        },
        {
            label: "Allowance (in%)",
            value: machine.allowance
        },
        {
            label: "Setup Base Time",
            value: machine.setupBaseTime
        },
        {
            label: "Machine Hourly Rate",
            value: machine.machineHourlyRate
        },
        {
            label: "Setup Hour Rate ",
            value: machine.setupHourRate
        },
    ]

    const section3 = [
        {
            label: "Max. Tool Length",
            value: machine.maxToolLength
        },
        {
            label: "Max Tool Dia",
            value: machine.maxToolDiameter
        },
        {
            label: "Max Table Length ",
            value: machine.maxTableLength
        },
        {
            label: "Max table Breadth ",
            value: machine.maxTableBreadth
        },
        {
            label: "Max Workpiece Weight ",
            value: machine.maxWorkpieceWeight
        },
        {
            label: "Tool Change Time",
            value: machine.toolChangeTime
        },
    ]

    return (
        <div>
        <div className="flex justify-between items-center p-5 border-b border-dashed">
            <h1 className="text-2xl font-bold">Machine Details</h1>

            <Button variant="outline" size="lg" className="border-dashed cursor-pointer">
                <PencilIcon />
                <span className="hidden lg:inline">Edit Info</span>
            </Button>
        </div>
        <div className="grid grid-cols-3 border-b border-dashed divide-x divide-dashed">
            <div className="divide-y divide-dashed">
            {section1.map((item) => (
                <div className={cn(
                    "flex items-center gap-1 p-2",
                )} key={item.label}>
                    <h1 className="font-medium text-muted-foreground">{item.label} :</h1>
                    <p>{item.value}</p>
                </div>
            ))}
            </div>
            <div className="divide-y divide-dashed">
            {section2.map((item) => (
                <div className={cn(
                    "flex items-center gap-1 border-b border-dashed p-2",
                )} key={item.label}>
                    <h1 className="font-medium text-muted-foreground">{item.label} :</h1>
                    <p>{item.value}</p>
                </div>
            ))}
            </div>
            <div className="divide-y divide-dashed">
            {section3.map((item) => (
                <div className={cn(
                    "flex items-center gap-1 border-b border-dashed p-2",
                )} key={item.label}>
                    <h1 className="font-medium text-muted-foreground">{item.label} :</h1>
                    <p>{item.value}</p>
                </div>
            ))}
            </div>
        </div>
    </div>
    )
}