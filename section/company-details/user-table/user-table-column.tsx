import { Switch } from "@/components/ui/switch"
import NewUserDetailsForm from "@/section/comapny/new-user-details.form"
import { IUser } from "@/types/user.type"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

export const userTableColumn: ColumnDef<IUser>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div >{row.original.name}</div>,
    },
    {
      accessorKey: "designation",
      header: "Designation",
      cell: ({ row }) => <div >{row.original.designation}</div>,
    },
    {
      accessorKey: "contactNo",
      header: "Contact No.",
      cell: ({ row }) => <div >{row.original.contactNo}</div>,
    },
    {
      accessorKey: "emailId",
      header: "Email",
      cell: ({ row }) => <div >{row.original.emailId}</div>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <div >{row.original.role}</div>,
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
        accessorKey: "action",
        header: " ",
        cell: ({ row }) => <div className="flex items-center justify-end gap-2">
            {/* <Button variant="outline" size="sm">
              Edit Info
            </Button> */}
            <NewUserDetailsForm />
            <Link href={`/company/${row.original.companyId}/user/${row.original.id}`}>
              Show Details
            </Link>
        </div>,
    },
  ]