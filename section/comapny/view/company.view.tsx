"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { useCompany } from "@/hooks/use-company"
import { ICompany } from "@/types/company"
import { Loader2 } from "lucide-react"

export default function ComapnyViewSection() {

     
    const { data, isLoading } = useCompany()

    if (isLoading) return <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
    </div>

  return (
    <div>
    {data && data.data.map((company: ICompany) => (
        <Card key={company.id}>
            <CardHeader>
                <CardTitle>
                    {company.companyName}
                </CardTitle>
            </CardHeader>
        </Card>
    ))}
    </div>
  )
}