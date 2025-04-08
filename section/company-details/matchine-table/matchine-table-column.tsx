import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { IMachine } from "@/types/matchine.type"
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
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="text-sm">{row.original.status === 'active' ? 'Active' : 'Inactive'}</span>
          <Switch checked={row.original.status === 'active'} />
        </div>
      ),
    },
    {
      accessorKey: "plant",
      header: "Plant",
      cell: ({ row }) => <div >{row.original.plant}</div>,
    },
    {
      accessorKey: "addedBy",
      header: "Added By",
      cell: ({ row }) => <div >{row.original.addedBy}</div>,
    },
    {
      accessorKey: "avgSetupTime",
      header: "Avg Setup Time",
      cell: ({ row }) => <div >{row.original.avgSetupTime}</div>,
    },
    {
      accessorKey: "hourlyCost",
      header: "Hourly Cost",
      cell: ({ row }) => <div >{row.original.hourlyCost}</div>,
    }, 
    {
        accessorKey: "action",
        header: " ",
        cell: ({ row }) => <div className="flex items-center justify-end gap-2">
            <Button variant="outline" size="sm">
              Edit Info
            </Button>
            <Link href={`/company/${row.original.companyId}/machine/${row.original.id}`}>
              Show Details
            </Link>
        </div>,
    },
  ]