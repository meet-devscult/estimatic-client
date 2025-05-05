"use client"

import { DataTable } from "@/components/table-layout/data-table"
import { Button } from "@/components/ui/button"
import data from "@/db.json"
import { IUser } from "@/types/user.type"
import { PlusIcon } from "lucide-react"
import { roleTableColumn } from "../roles-column"

export default function RoleViewSection() {
    // const { data, isLoading } = useUsers()

    // if (isLoading) return <div className="flex justify-center items-center h-screen">
    //     <Loader2 className="w-10 h-10 animate-spin" />
    // </div>

  return <div>
    <div className="container">
      <div className="flex justify-between items-center p-5 border-b border-dashed">
        <h1 className="text-2xl font-bold">Roles</h1>
        <Button variant="outline" size="lg" className="border-dashed">
          <PlusIcon />
          <span className="hidden lg:inline">Add Role</span>
        </Button>
      </div>
    </div>
    <DataTable columns={roleTableColumn} data={data.users as unknown as IUser[]} />
  </div>
}