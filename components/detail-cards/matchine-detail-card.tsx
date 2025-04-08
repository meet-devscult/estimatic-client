import { cn } from "@/lib/utils"
import { IMachine } from "@/types/matchine.type"
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
            value: "STATIC_DATA"
        },
        {
            label: "Machine",
            value: "STATIC_DATA"
        },
        {
            label: "Manufacturer",
            value: "STATIC_DATA"
        },
        {
            label: "Spindle Max RPM",
            value: "000"
        },
        {
            label: "Efficiency %",
            value: "00 %"
        },
        {
            label: "Power Consumption (KW/hour)",
            value: "00"
        }
    ]

    const section2 = [
        {
            label: "Status",
            value: machine.status
        },
        {
            label: "Allowance (in%)",
            value: "00"
        },
        {
            label: "Setup Base Time",
            value: "00 Mins"
        },
        {
            label: "Machine Hourly Rate",
            value: "00 Rs"
        },
        {
            label: "Setup Hour Rate ",
            value: "000 Rs"
        },
    ]

    const section3 = [
        {
            label: "Max. Tool Length",
            value: "000 (in meters)"
        },
        {
            label: "Max Tool Dia",
            value: "000 (in meters)"
        },
        {
            label: "Max Table Length ",
            value: "000 (in meters)"
        },
        {
            label: "Max table Breadth ",
            value: "000 (in meters)"
        },
        {
            label: "Max Workpiece Weight ",
            value: "000 (in meters)"
        },
        {
            label: "Tool Change Time",
            value: "000 (in meters)"
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