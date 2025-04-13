import { IPart } from "@/types/part.type"
import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"
import Link from "next/link"

export const partTableColumn: ColumnDef<IPart>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="text-center">{row.original.name}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.status}
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <div className="text-center">{row.original.type}</div>,
    },
    {
      accessorKey: "material",
      header: "Material",
      cell: ({ row }) => <div className="text-center">
        <p className="text-sm">{row.original.material}</p>
        <p className="text-xs text-muted-foreground">{row.original.shape}</p>
        </div>,
    },
    {
      accessorKey: "time",
      header: "Time",
      cell: ({ row }) => <div className="text-center">
        <p className="text-sm">{row.original.time}</p>
        <p className="text-xs text-muted-foreground">{row.original.timeUnit}</p>
      </div>,
    },
    {
      accessorKey: "cost",
      header: "Cost",
      cell: ({ row }) => <div className="text-center">
        <p className="text-sm">{row.original.cost}</p>
        <p className="text-xs text-muted-foreground">{row.original.costUnit}</p>
      </div>,
    }, 
    {
      accessorKey: "createdOn",
      header: "Created On",
      cell: ({ row }) => <div className="text-center">{dayjs.unix(row.original.createdOn).format("DD/MM/YYYY")}</div>,
    }, 
    {
        accessorKey: "action",
        header: " ",
        cell: ({ row }) => <div className="flex items-center justify-end gap-2">
            <Link href={`/company/${row.original.companyId}/part/${row.original.id}`}>
              Show Details
            </Link>
        </div>,
    },
  ]