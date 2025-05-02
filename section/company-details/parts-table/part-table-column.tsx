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
    //   accessorKey: "status",
    //   header: "Status",
    //   cell: ({ row }) => (
    //     <div className="text-center">
    //       {row.original.status}
    //     </div>
    //   ),
    // },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <div className="text-center">{row.original.file_type}</div>,
    },
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
      cell: ({ row }) => <div className="text-center">
        {/* <p className="text-sm">{row.original.time}</p> */}
        <p className="text-sm">-</p>
        <p className="text-xs text-muted-foreground">Mins per piece</p>
        {/* <p className="text-xs text-muted-foreground">{row.original.timeUnit}</p> */}
      </div>,
    },
    {
      accessorKey: "cost",
      header: "Cost",
      cell: ({ row }) => <div className="text-center">
        <p className="text-sm">{row.original.material_cost}</p>
        <p className="text-xs text-muted-foreground">Rs./piece</p>
      </div>,
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