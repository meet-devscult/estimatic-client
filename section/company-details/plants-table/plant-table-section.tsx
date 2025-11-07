import { DataTable } from "@/components/table-layout/data-table";
import { usePlantsByCompanyId } from "@/hooks/use-plants";
import NewPlantDetailsForms from "@/section/comapny/new-plant.form";
import { Loader2 } from "lucide-react";
import { plantTableColumn } from "./plant-table-column";

interface PlantTableSectionProps {
    company_id: string
}

export default function PlantTableSection({ company_id }: PlantTableSectionProps) {

    const { data: plants, isLoading: isPlantsLoading } = usePlantsByCompanyId(company_id)

    if (isPlantsLoading) return <div className="flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin" />
    </div>

    return (
        <div>
            <div>
                <div className="flex justify-between items-center p-5 border-b border-dashed">
                    <h1 className="text-2xl font-bold">Plants</h1>
                    <NewPlantDetailsForms company_id={company_id} />
                </div>
            </div>
            <DataTable columns={plantTableColumn} data={plants} headerClassName="text-left" />
        </div>
    )
}