import { DataTable } from "@/components/table-layout/data-table";
import { useMachineByCompanyId } from "@/hooks/use-machine";
import NewMachineDetailsFormPopUp from "@/section/comapny/new-machine-details.form";
import { Loader2 } from "lucide-react";
import { machineTableColumn } from "./machine-table-column";

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
                    <NewMachineDetailsFormPopUp companyId={company_id} />
                </div>
            </div>
            <DataTable columns={machineTableColumn} data={machines} headerClassName="text-left" />
        </div>
    )
}