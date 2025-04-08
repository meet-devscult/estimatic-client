import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ICompany } from "@/types/company"
import { ColumnDef } from "@tanstack/react-table"
import { ChevronRight } from "lucide-react"




export const companyColumn: ColumnDef<ICompany>[] = [
    {
      accessorKey: "id",
      header: "Sr. No.",
      cell: ({ row }) => <div>{row.original.id}</div>,
    },
    {
      accessorKey: "name",
      header: "Company Name",
      cell: ({ row }) => <div>{row.original.companyName}</div>,
    },
    {
      accessorKey: "active",
      header: "Status",
      cell: ({ row }) => (
        <div className="flex items-center">
          <span className="mr-2 text-sm font-medium">Active</span>
          <Switch
            checked={row.original.status === "active"}
            onCheckedChange={() => console.log(row.original)}
            className="data-[state=checked]:bg-green-500"
          />
        </div>
      ),
    },
    {
      accessorKey: "users",
      header: "Users",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-0 rounded-full px-2">
          {row.original.users}
        </Badge>
      ),
    },
    {
      accessorKey: "quotations",
      header: "Quotations Status",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-0 rounded-full px-2 py-1">
          {row.original.quotationsStatus}
        </Badge>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className={`border-0 rounded-full px-2 py-1 ${
            row.original.type === "Paid" ? "bg-purple-100 text-purple-800" : "bg-green-100 text-green-800"
          }`}
        >
          {row.original.type}
        </Badge>
      ),
    },
    {
      accessorKey: "plants",
      header: "Plants",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-green-100 text-green-800 border-0 rounded-full px-2">
          {row.original.plants}
        </Badge>
      ),
    },
    {
      accessorKey: "machines",
      header: "Machines",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-0 rounded-full px-2">
          {row.original.machines}
        </Badge>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button variant="ghost" className="flex items-center text-sm text-gray-600 hover:text-gray-900" onClick={() => console.log(row.original)}>
          Show Details <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      ),
    },
  ]