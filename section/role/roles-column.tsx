import { buttonVariants } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useUpdateCompanyAdminUserPermissions } from "@/hooks/use-user"
import { IUser } from "@/types/user.type"
import { useQueryClient } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
export const roleTableColumn: ColumnDef<IUser>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="text-center" >{row.original.user_name}</div>,
    },
    {
      accessorKey: "username",
      header: "Email",
      cell: ({ row }) => <div className="text-center" >{row.original.email}</div>,
    },
   {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const queryClient = useQueryClient()
        const { mutate, isPending } = useUpdateCompanyAdminUserPermissions()
        const handleStatusChange = (checked: boolean) => {
          const newStatus = checked ? 'active' : 'inactive'
          
          queryClient.setQueryData(['company-admin-users'], (old: any) => {
            if (!old?.data) return old
            return {
              ...old,
              data: old.data.map((user: IUser) => 
                user.user_id === row.original.user_id 
                  ? { ...user, status: newStatus }
                  : user
              )
            }
          })
          
          mutate(
            {
              user_id: row.original.user_id,
              status: newStatus
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['company-admin-users'] })
              },
              onError: () => {
                queryClient.invalidateQueries({ queryKey: ['company-admin-users'] })
              }
            }
          )
        }
        
        return (
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm">{row.original.status === 'active' ? 'Active' : 'Inactive'}</span>
            <Switch 
              checked={row.original.status === 'active'} 
              onCheckedChange={handleStatusChange}
              disabled={isPending}
              className="cursor-pointer"
            />
          </div>
        )
      },
    },
    {
        accessorKey: "action",
        header: " ",
        cell: ({ row }) => <div className="flex items-center justify-end gap-2">
            <Link href={`/roles/create?user_id=${row.original.user_id}`} className={buttonVariants({variant: 'outline', size: 'sm'})}>
              Edit Info
            </Link>
            <Link href={`/roles/${row.original.user_id}`} className="flex items-center text-sm hover:text-primary">
                Show Details <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
        </div>,
    },
  ]