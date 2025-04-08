import { cn } from "@/lib/utils"
import { IPart } from "@/types/part.type"
import { DownloadCloud } from "lucide-react"
import { Button } from "../ui/button"

interface PartDetailCardProps {
    part: IPart
}
export default function PartDetailCard({ part }: PartDetailCardProps) {

    const section1 = [
        {
            label: "Name",
            value: part.name
        },
        {
            label: "Company",
            value: "STATIC_DATA"
        },
        {
            label: "No. of lots",
            value: "000"
        },
        {
            label: "Stock per lot",
            value: "000"
        },
        {
            label: "Material Cost ",
            value: "000 Rs. (per kg)"
        }
    ]

    const section2 = [
        {
            label: "Shape",
            value: "STATIC_DATA"
        },
        {
            label: "Diameter",
            value: "STATIC_DATA"
        },
        {
            label: "Length",
            value: "STATIC_DATA"
        },
    ]

    const section3 = [
        {
            label: "Scrap Cost",
            value: "STATIC_DATA"
        },
        {
            label: "Gross Weight ",
            value: "STATIC_DATA"
        },
        {
            label: "Net Weight",
            value: "STATIC_DATA"
        },
        {
            label: "Tolerance %",
            value: "000"
        },
    ]

    return (
        <div>
        <div className="flex justify-between items-center p-5 border-b border-dashed">
            <h1 className="text-2xl font-bold">Part Details</h1>
            <div className="flex gap-2">
            <Button variant="outline" size="lg" className="border-dashed cursor-pointer">
                <DownloadCloud />
                <span className="hidden lg:inline">Download Part File</span>
            </Button>
            <Button variant="outline" size="lg" className="border-dashed cursor-pointer">
                <DownloadCloud />
                <span className="hidden lg:inline">Download Operations</span>
            </Button>
            <Button variant="outline" size="lg" className="border-dashed cursor-pointer">
                <DownloadCloud />
                <span className="hidden lg:inline">Download Quotation</span>
            </Button>
            </div>
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