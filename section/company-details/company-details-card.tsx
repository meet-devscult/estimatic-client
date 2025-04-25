import { Button } from "@/components/ui/button"
import { useCompanyById } from "@/hooks/use-company"
import { cn } from "@/lib/utils"
import { ICompany } from "@/types/company.type"
import dayjs from "dayjs"
import { Loader2, PlusIcon } from "lucide-react"

interface CompanyDetailsCardProps {
    id: string
}

export default function CompanyDetailsCard({id}: CompanyDetailsCardProps) {

    const { data, isLoading } = useCompanyById(id)

    if (isLoading) return <div className="flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin" />
    </div>

    const { name, website, updated_at, type, status, upto_validated_at, quotations_limits, users_count, machines_count } = data.data as ICompany;

    const company_details_grid: Record<string, string>[] = [
        {
            title: "Company Name",
            value: name
        },
        {
            title: "Website",
            value: website
        },
        {
            title: "Created On",
            value: dayjs.unix(updated_at).format("DD/MM/YYYY")
        },  
        {
            title: "Type",
            value: type
        },
        {
            title: "Status",
            value: status
        },
        {
            title: "Valid Upto",
            value: dayjs.unix(upto_validated_at).format("DD/MM/YYYY")
        },
        {
            title: "Quotations",
            value: quotations_limits.toString()
        },
        {
            title: "Users",
            value: users_count.toString()
        },
        {
            title: "Machines",
            value: machines_count.toString() || "0"    
        },
    ]

    return (
        <div>
        <div className="flex justify-between items-center p-5 border-b border-dashed">
            <h1 className="text-2xl font-bold">Companies</h1>
            <Button variant="outline" size="lg" className="border-dashed">
      <PlusIcon />
      <span className="hidden lg:inline">Edit Info</span>
    </Button>
        </div>
        <div className="grid grid-cols-3 divide-x">
            {company_details_grid.map((item, index) => (
                <div className={cn(
                    "flex items-center gap-1 border-b border-dashed p-2",
                    (index + 1) % 3 === 0 && "border-r-0" 
                )} key={item.title}>
                    <h1 className="font-medium text-muted-foreground">{item.title} :</h1>
                    <p>{item.value}</p>
                </div>
            ))}
        </div>
    </div>
    )
}