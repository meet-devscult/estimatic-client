import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { IUser } from "@/types/user.type"
import { ColumnDef } from "@tanstack/react-table"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
export const roleTableColumn: ColumnDef<IUser>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="text-center" >{row.original.user_id}</div>,
    },
    {
      accessorKey: "username",
      header: "Username",
      cell: ({ row }) => <div className="text-center" >{row.original.user_name}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm">{row.original.status === 'active' ? 'Active' : 'Inactive'}</span>
          <Switch checked={row.original.status === 'active'} />
        </div>
      ),
    },
    {
        accessorKey: "action",
        header: " ",
        cell: () => <div className="flex items-center justify-end gap-2">
            <Button variant="outline" size="sm">
              Edit Info
            </Button>
            <Link  href={`#`} className="flex items-center text-sm ">
          Show Details <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
        </div>,
    },
  ]