import FilterPannel from "@/components/filter-pannel";
import { DataTable } from "@/components/table-layout/data-table";
import { useMachineByCompanyId } from "@/hooks/use-machine";
import NewMachineDetailsFormPopUp from "@/section/comapny/new-machine-details.form";
import { Loader2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { machineTableColumn } from "./machine-table-column";

interface MatchineTableSectionProps {
    company_id: string
}

export default function MatchineTableSection({ company_id }: MatchineTableSectionProps) {

    const defaultFilter = {
        search: "",
        status: "",
        plant_name: "",
    }

    const [filter, setFilter] = useState(defaultFilter)
    const [isApplyingFilters, startTransition] = useTransition()

    const handleFilterChange = (newFilter: { search?: string, status?: string, plant_name?: string }) => {
        setFilter(prev => ({
            ...prev,
            ...newFilter
        }))
    }

    const { data: machines, isLoading: isMachinesLoading, refetch, isFetching } = useMachineByCompanyId({ companyId: company_id, ...filter })

    useEffect(() => {
        startTransition(async() => {
          await refetch()
        })
    }, [filter])

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
            <FilterPannel
                isSearchInput
                placeholderForSearchInput="Search Machine Name"
                searchbarClassName="w-[300px]"
                filterValues={filter}
                onFilterValuesChange={handleFilterChange}
                defaultFilterValues={defaultFilter}
                isStatusFilter
                isPlantNameInput
                placeholderForPlantNameInput="Plant Name"
                plantClassName="w-[200px]"
            />
            {(isFetching && isApplyingFilters) ? <div className="flex justify-center items-center mt-10">
                <Loader2 className="w-10 h-10 animate-spin" /> 
                <span className="ml-2">Applying Filters...</span>
            </div> : <DataTable columns={machineTableColumn} data={machines || []} headerClassName="text-left" />}
        </div>
    )
}