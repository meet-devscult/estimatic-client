import { ColumnDef } from "@tanstack/react-table"

export const plantTableColumn: ColumnDef<string>[] = [
    {
      accessorKey: "user_name",
      header: "Name",
      cell: ({ row }) => <div >{row.original}</div>,
    },
    {
        accessorKey: "action",
        header: " ",
        cell: ({ row }) => <div className="flex items-center justify-end gap-2">
            {/* <NewUserDetailsForm defaultValues={{
              user_id: row.original.user_id,
              user_name: row.original.user_name,
              designation: row.original.designation,
              phone_number: row.original.phone_number,
              email: row.original.email,
              type: row.original.type,
              password: "",
              company_id: row.original.company_id,
            }} /> */}
            {/* <Link href={`/company/${row.original.company_id}/user/${row.original.user_id}`}>
              Show Details
            </Link> */}
            {/* <Link href={`/users/${row.original.user_id}`}>
              Show Details
            </Link> */}
        </div>,
    },
  ]