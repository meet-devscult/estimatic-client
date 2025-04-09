import { IPart } from "@/types/part.type"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

export const partTableColumn: ColumnDef<IPart>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div >{row.original.name}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <div >{row.original.status}</div>,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <div >{row.original.type}</div>,
    },
    {
      accessorKey: "material",
      header: "Material",
      cell: ({ row }) => <div >{row.original.material}</div>,
    },
    {
      accessorKey: "time",
      header: "Time",
      cell: ({ row }) => <div >{row.original.time}</div>,
    },
    {
      accessorKey: "cost",
      header: "Cost",
      cell: ({ row }) => <div>{row.original.cost}</div>,
    },
    {
      accessorKey: "createdOn",
      header: "Created On",
      cell: ({ row }) => <div>{row.original.createdOn}</div>,
    },
    {
        accessorKey: "action",
        header: " ",
        cell: () => <div className="flex items-center justify-end gap-2">
            <Link href={`#`}>
              Show Details
            </Link>
        </div>,
    },
  ]