import { Switch } from "@/components/ui/switch"
import { useToggleMutation } from "@/hooks/use-toggle"
import { endpoints } from "@/lib/axios"
import NewMachineDetails from "@/section/comapny/new-machine-details.form"
import { IMachine } from "@/types/machine.type"
import { useQueryClient } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

export const machineTableColumn: ColumnDef<IMachine>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div >{row.original.name}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const queryClient = useQueryClient()
        const { mutate, isPending, error, isError } = useToggleMutation({queryClient, queryKey: ["machines","company", row.original.company_id]})
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm">{row.original.status === 'active' ? 'Active' : 'Inactive'}</span>
            <Switch 
              checked={row.original.status === 'active'} 
              onCheckedChange={() => {
                mutate({url: endpoints.machines.root, data: {machine_id: row.original.machine_id, status: row.original.status === 'active' ? 'inactive' : 'active'}})
              }} 
              disabled={isPending} 
            />
          </div>
        )
      },
    },
    {
      accessorKey: "plant",
      header: "Plant",
      cell: ({ row }) => <div >{row.original.plant_name}</div>,
    },
    {
      accessorKey: "addedBy",
      header: "Added By",
      cell: ({ row }) => <div >{row.original.user_name}</div>,
    },
    {
      accessorKey: "avgSetupTime",
      header: "Avg Setup Time",
      cell: ({ row }) => <div >{row.original.setup_base_time}</div>,
    },
    {
      accessorKey: "hourlyCost",
      header: "Hourly Cost",
      cell: ({ row }) => <div >{row.original.setup_hour_rate}</div>,
    }, 
    {
      accessorKey: "action",
      header: " ",
      cell: ({ row }) => <div className="flex items-center justify-end gap-2">
        <NewMachineDetails defaultValues={{
          company_id: row.original.company_id,
          machine_id: row.original.machine_id,
              
          // basic information
          plant_name: row.original.plant_name,
          name: row.original.name,
          type: row.original.type,
          category: row.original.category,
          manufacturer: row.original.manufacturer,
          max_rpm: row.original.max_rpm,
          efficiency: row.original.efficiency,
          power_consumption: row.original.power_consumption,
          status: row.original.status,

          // machine specifications
          allowance: row.original.allowance,
          setup_base_time: row.original.setup_base_time,

          // machine rates
          machine_rate: row.original.machine_rate,
          setup_hour_rate: row.original.setup_hour_rate,

          max_tool_length: row.original.max_tool_length,
          max_tool_diameter: row.original.max_tool_diameter,
          max_table_length: row.original.max_table_length,
          max_table_breadth: row.original.max_table_breadth,
          max_workpiece_weight: row.original.max_workpiece_weight,
          tool_change_time: row.original.tool_change_time,
        }} />
        <Link href={`/company/${row.original.company_id}/machine/${row.original.machine_id}`}>
          Show Details
        </Link>
      </div>,
    },
  ]