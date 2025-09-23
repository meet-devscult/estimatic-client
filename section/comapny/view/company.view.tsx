"use client"

import FilterPannel from "@/components/filter-pannel"
import { DataTable } from "@/components/table-layout/data-table"
import { Button } from "@/components/ui/button"
import { useCompany } from "@/hooks/use-company"
import { Loader2, PlusIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"
import { companyColumn } from "../company-column"

export default function ComapnyViewSection() {

  const defaultFilter = {
    search: "",
    status: "",
    type: ""
  }

  const [filter, setFilter] = useState(defaultFilter)
  const [isApplyingFilters, startTransition] = useTransition()

  const handleFilterChange = (newFilter: { status?: string; search?: string; type?: string }) => {
    setFilter(prev => ({
      ...prev,
      ...newFilter
    }))
  }
  
  const { data, isLoading, refetch, isFetching } = useCompany({...filter})
  
  useEffect(() => {
    startTransition(async() => {
      await refetch()
    })
  }, [filter])

  const router = useRouter()

  if (isLoading) return <div className="flex justify-center items-center h-screen">
    <Loader2 className="w-10 h-10 animate-spin" />
  </div>

  return <div>
    <div>
      <div className="flex justify-between items-center p-5 border-b border-dashed">
        <h1 className="text-2xl font-bold">Companies</h1>
        <Button variant="outline" size="lg" className="border-dashed hover:cursor-pointer" onClick={() => router.push("/company/create")}>
          <PlusIcon />
          <span className="hidden lg:inline">Add Company</span>
        </Button>
      </div>
    </div>
    <FilterPannel 
      isSearchInput
      placeholderForSearchInput="Search by Company Name"
      searchbarClassName="w-[300px]"
      filterValues={filter} 
      onFilterValuesChange={handleFilterChange} 
      defaultFilterValues={defaultFilter}
      isStatusFilter 
      isTypeFilter
    />
    {(isFetching && isApplyingFilters) ? <div className="flex justify-center items-center mt-10">
      <Loader2 className="w-10 h-10 animate-spin" /> 
      <span className="ml-2">Applying Filters...</span>
    </div> : <DataTable columns={companyColumn} data={data || []} />}
  </div>
}