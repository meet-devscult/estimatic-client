"use client"


import { DataTable } from "@/components/table-layout/data-table"
import { Button } from "@/components/ui/button"
import { useCompany } from "@/hooks/use-company"
import { Loader2, PlusIcon } from "lucide-react"
import { companyColumn } from "../company-column"

export default function ComapnyViewSection() {
    const { data, isLoading } = useCompany()

    if (isLoading) return <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
    </div>

    console.log(data)

  return <div>
    <div className="container">
      <div className="flex justify-between items-center p-5 border-b border-dashed">
        <h1 className="text-2xl font-bold">Companies</h1>
        <Button variant="outline" size="lg" className="border-dashed">
          <PlusIcon />
          <span className="hidden lg:inline">Add Company</span>
        </Button>
      </div>
    </div>
    <DataTable columns={companyColumn} data={data?.data}  />
  </div>
}