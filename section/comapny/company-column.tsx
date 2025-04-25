import { Switch } from "@/components/ui/switch"
import { ICompany } from "@/types/company.type"
import { ColumnDef } from "@tanstack/react-table"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export const companyColumn: ColumnDef<ICompany>[] = [
    {
      accessorKey: "id",
      header: "Sr. No.",
      cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
    },
    {
      accessorKey: "name",
      header: "Company Name",
      cell: ({ row }) => <div className="text-center">{row.original.name}</div>,
    },
    {
      accessorKey: "active",
      header: "Status",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <span className="mr-2 text-sm font-medium">{row.original.status === "active" ? "Active" : "Inactive"}</span>
          <Switch
            checked={row.original.status === "active"}
            onCheckedChange={() => console.log(row.original)}
          />
        </div>
      ),
    },
    {
      accessorKey: "users",
      header: "Users",
      cell: ({ row }) => (
          <div className="text-center">{row.original.users_count}</div>
      ),
    },
    {
      accessorKey: "quotations",
      header: "Quotations Status",
      cell: ({ row }) => (
        <div className="text-center">{row.original.quotations_limits}</div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <div className="text-center">{row.original.type}</div>
      ),
    },
    {
      accessorKey: "plants",
      header: "Plants",
      cell: ({ row }) => (
        <div className="text-center">{row.original.plants_count || 0}</div>
      ),
    },
    {
      accessorKey: "machines",
      header: "Machines",
      cell: ({ row }) => (
        <div className="text-center">{row.original.machines_count || 0}</div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex justify-end">
      <Link  href={`/company/${row.original.company_id}`} className="flex items-center text-sm ">
          Show Details <ChevronRight className="ml-1 h-4 w-4" />
        </Link></div>
      ),
    },
  ]