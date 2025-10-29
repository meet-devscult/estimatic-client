"use client"

import { DataTable } from "@/components/table-layout/data-table"
import { Button } from "@/components/ui/button"
import { useCompanyAdminUsers } from "@/hooks/use-user"
import { IUser } from "@/types/user.type"
import { Loader2, PlusIcon } from "lucide-react"
import Link from "next/link"
import { roleTableColumn } from "../roles-column"

export default function RoleViewSection() {
    const { data, isLoading } = useCompanyAdminUsers()

    if (isLoading) return <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
    </div>

  return <div>
      <div className="flex justify-between items-center p-5 border-b border-dashed">
        <h1 className="text-2xl font-bold">Roles</h1>
        <Link href="/role/create">
          <Button variant="outline" size="lg" className="border-dashed">
            <PlusIcon />
            <span className="hidden lg:inline">Add Role</span>
          </Button>
        </Link>
      </div>
      <DataTable columns={roleTableColumn} data={data?.data as unknown as IUser[]} />
    </div>
}