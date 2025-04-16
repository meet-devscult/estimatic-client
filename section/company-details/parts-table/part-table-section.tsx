import { DataTable } from "@/components/table-layout/data-table";
import { usePartByCompanyId } from "@/hooks/use-part";
import { Loader2 } from "lucide-react";
import { partTableColumn } from "./part-table-column";

interface PartTableSectionProps {
    company_id: string
}

export default function PartTableSection({ company_id }: PartTableSectionProps) {

    const { data: parts, isLoading: isPartsLoading } = usePartByCompanyId(company_id)

    if (isPartsLoading) return <div className="flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin" />
    </div>
    return (
        <div>
            <div>
                <div className="flex justify-between items-center p-5 border-b border-dashed">
                    <h1 className="text-2xl font-bold">Parts</h1>
                </div>
            </div>
            <DataTable columns={partTableColumn} data={parts} headerClassName="text-center" />
        </div>
    )
}