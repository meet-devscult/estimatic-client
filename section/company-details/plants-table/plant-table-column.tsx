import { deletePlant } from "@/actions/plants.action"
import { Button } from "@/components/ui/button"
import { usePermissionStore } from "@/guard/permission.store"
import { usePlantsByCompanyId } from "@/hooks/use-plants"
import NewPlantDetailsForms from "@/section/comapny/new-plant.form"
import { PERMISSION } from "@/types/user.type"
import { ColumnDef } from "@tanstack/react-table"
import { Loader2, Trash2 } from "lucide-react"
import { useTransition } from "react"
import { toast } from "sonner"

interface IPlant {
    name: string
    user_name: string
    plant_id: string
    company_id: string | null
}

export const plantTableColumn: ColumnDef<IPlant>[] = [
    {
      accessorKey: "sr_no",
      header: "Sr. No.",
      cell: ({ row }) => <div >{row.index + 1}</div>,
    },
    {
      accessorKey: "name",
      header: "Plant Name",
      cell: ({ row }) => <div >{row.original.name}</div>,
    },
    {
        accessorKey: "user_name",
        header: "Created By",
        cell: ({ row }) => <div >{row.original.user_name || "-"}</div>,
    },
    {
        accessorKey: "action",
        header: " ",
        cell: ({ row }) => {
          const { getPermission } = usePermissionStore();
          const permission = getPermission('companies');
          const [isDeleting, startTransition] = useTransition()
          const {refetch} = usePlantsByCompanyId(row.original.company_id || "");
          const handleDelete = () => {
            startTransition(async () => {
              try {
                await deletePlant(row.original.plant_id);
                toast.success("Plant deleted successfully");
              } catch (error) {
                toast.error("Failed to delete plant");
                console.error("Error deleting plant:", error);
              }
              finally {
                refetch()
              }
            });
          };
          return (
            <div className="flex items-center justify-end gap-2">
              <NewPlantDetailsForms  defaultValues={{
                plant_id: row.original.plant_id,
                name: row.original.name,
              }} />
              <Button
                variant="outline"
                size="lg"
                className="border-dashed cursor-pointer"
                onClick={handleDelete}
                disabled={isDeleting || permission !== PERMISSION.FULL_ACCESS}
              >
                {isDeleting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />) : 
                    (
                      <Trash2 className="w-4 h-4" />
                    )
                    }
                {isDeleting ? "Deleting..." : "Delete Plant"}
          </Button>
        </div>);
        }
    },
  ]