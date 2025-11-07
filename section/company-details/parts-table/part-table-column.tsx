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
    // {
    //   accessorKey: "type",
    //   header: "Type",
    //   cell: ({ row }) => <div className="text-center">{row.original.file_type}</div>,
    // },
    {
      accessorKey: "material",
      header: "Material",
      cell: ({ row }) => <div className="text-center">
        <p className="text-sm">{row.original.material_category}</p>
        <p className="text-xs text-muted-foreground">{row.original.material_shape}</p>
        </div>,
    },
    {
      accessorKey: "time",
      header: "Time",
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.recommended_operations?.length
            ? row.original.recommended_operations
                .reduce(
                  (acc: number, curr: any) => acc + curr.time_per_piece_min,
                  0
                )
                .toFixed(2)
            : '-'}
        </div>
      ),
    },
    {
      accessorKey: "cost",
      header: "Cost",
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.total_cost ? row.original.total_cost.toFixed(2) : '-'}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.total_cost ? 'Completed' : 'Ongoing'}
        </div>
      ),
    },
    {
      accessorKey: "createdOn",
      header: "Created On",
      cell: ({ row }) => <div className="text-center">{dayjs.unix(row.original.created_at).format("DD/MM/YYYY")}</div>,
    }, 
    {
        accessorKey: "action",
        header: " ",
        cell: ({ row }) => <div className="flex items-center justify-end gap-2">
            <Link href={`/company/${row.original.company_id}/part/${row.original.part_id}`}>
              Show Details
            </Link>
        </div>,
    },
  ]