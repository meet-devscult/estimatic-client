import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ICompany } from "@/types/company"
import { ColumnDef } from "@tanstack/react-table"
import { ChevronRight } from "lucide-react"




export const companyColumn: ColumnDef<ICompany>[] = [
    {
      accessorKey: "id",
      header: "Sr. No.",
      cell: ({ row }) => <div className="text-center">{row.original.id}</div>,
    },
    {
      accessorKey: "name",
      header: "Company Name",
      cell: ({ row }) => <div className="text-center">{row.original.companyName}</div>,
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
          <div className="text-center">{row.original.users}</div>
      ),
    },
    {
      accessorKey: "quotations",
      header: "Quotations Status",
      cell: ({ row }) => (
        <div className="text-center">{row.original.quotationsStatus}</div>
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
        <div className="text-center">{row.original.plants}</div>
      ),
    },
    {
      accessorKey: "machines",
      header: "Machines",
      cell: ({ row }) => (
        <div className="text-center">{row.original.machines}</div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex justify-end">
        <Button variant="ghost" className="flex items-center text-sm text-gray-600 hover:text-gray-900" onClick={() => console.log(row.original)}>
          Show Details <ChevronRight className="ml-1 h-4 w-4" />
        </Button></div>
      ),
    },
  ]