import { Switch } from "@/components/ui/switch"
import NewUserDetailsForm from "@/section/comapny/new-user-details.form"
import { IUser } from "@/types/user.type"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

export const userTableColumn: ColumnDef<IUser>[] = [
    {
      accessorKey: "user_name",
      header: "Name",
      cell: ({ row }) => <div >{row.original.user_name}</div>,
    },
    {
      accessorKey: "designation",
      header: "Designation",
      cell: ({ row }) => <div >{row.original.designation}</div>,
    },
    {
      accessorKey: "phone_number",
      header: "Contact No.",
      cell: ({ row }) => <div >{row.original.phone_number}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div >{row.original.email}</div>,
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
            <NewUserDetailsForm defaultValues={{
              name: row.original.user_name,
              designation: row.original.designation,
              phone: row.original.phone_number,
              email: row.original.email,
              type: row.original.role,
              password: "",
            }} />
            <Link href={`/company/${row.original.company_id}/user/${row.original.user_id}`}>
              Show Details
            </Link>
            {/* <Link href={`/users/${row.original.user_id}`}>
              Show Details
            </Link> */}
        </div>,
    },
  ]