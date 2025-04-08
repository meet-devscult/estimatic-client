import { DataTable } from "@/components/table-layout/data-table";
import { Button } from "@/components/ui/button";
import { useMachineByCompanyId } from "@/hooks/use-matchine";
import { Loader2, PlusIcon } from "lucide-react";
import { machineTableColumn } from "./matchine-table-column";

interface MatchineTableSectionProps {
    company_id: string
}

export default function MatchineTableSection({ company_id }: MatchineTableSectionProps) {

    const { data: machines, isLoading: isMachinesLoading } = useMachineByCompanyId(company_id)

    if (isMachinesLoading) return <div className="flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin" />
    </div>
    return (
        <div>
            <div>
                <div className="flex justify-between items-center p-5 border-b border-dashed">
                    <h1 className="text-2xl font-bold">Machines</h1>
                    <Button variant="outline" size="lg" className="border-dashed">
                        <PlusIcon />
                        <span className="hidden lg:inline">Add Machine</span>
                    </Button>
                </div>
            </div>
            <DataTable columns={machineTableColumn} data={machines} headerClassName="text-left" />
        </div>
    )
}