"use client"


import { useCompany } from "@/hooks/use-company"
import { Loader2 } from "lucide-react"

export default function ComapnyViewSection() {

     
    const { data, isLoading } = useCompany()

    if (isLoading) return <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
    </div>

    console.log(data)

  return <div></div>
}