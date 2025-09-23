import { Switch } from "@/components/ui/switch"
import { useToggleMutation } from "@/hooks/use-toggle"
import { endpoints } from "@/lib/axios"
import NewUserDetailsForm from "@/section/comapny/new-user-details.form"
import { IUser } from "@/types/user.type"
import { useQueryClient } from "@tanstack/react-query"
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
      cell: ({ row }) => <div >{row.original.type}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const queryClient = useQueryClient()
        const { mutate, isPending, error, isError } = useToggleMutation({queryClient, queryKey: ["users","company", row.original.company_id]})
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm">{row.original.status === 'active' ? 'Active' : 'Inactive'}</span>
            <Switch 
              checked={row.original.status === 'active'} 
              onCheckedChange={() => mutate({url: endpoints.users.root, data: {user_id: row.original.user_id, status: row.original.status === 'active' ? 'inactive' : 'active'}})} 
              disabled={isPending}
            />
          </div>
        )
      },
    },
    {
        accessorKey: "action",
        header: " ",
        cell: ({ row }) => <div className="flex items-center justify-end gap-2">
            <NewUserDetailsForm defaultValues={{
              user_id: row.original.user_id,
              user_name: row.original.user_name,
              designation: row.original.designation,
              phone_number: row.original.phone_number,
              email: row.original.email,
              type: row.original.type,
              password: "",
              company_id: row.original.company_id,
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