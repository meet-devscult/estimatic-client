import { DataTable } from "@/components/table-layout/data-table";
import { Loader2 } from "lucide-react";
import { plantTableColumn } from "./plant-table-column";

interface PlantTableSectionProps {
    company_id: string
}

export default function PlantTableSection({ company_id }: PlantTableSectionProps) {

    // const { data: plants, isLoading: isPlantsLoading } = usePlantByCompanyId(company_id)

    const plants = [
        "Plant 1",
        "Plant 2",
        "Plant 3",
        "Plant 4",
        "Plant 5",
        "Plant 6",
        "Plant 7",
    ]

    if (plants.length === 0) return <div className="flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin" />
    </div>

    return (
        <div>
            <div>
                <div className="flex justify-between items-center p-5 border-b border-dashed">
                    <h1 className="text-2xl font-bold">Plants</h1>
                    {/* <NewPlantDetailsForms company_id={company_id} /> */}
                </div>
            </div>
            <DataTable columns={plantTableColumn} data={plants} headerClassName="text-left" />
        </div>
    )
}