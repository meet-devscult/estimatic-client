"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import CompanyDetailsCard from "../company-details-card"
import MatchineTableSection from "../machine-table/machine-table-section"
import PartTableSection from "../parts-table/part-table-section"
import PlantTableSection from "../plants-table/plant-table-section"
import TransactionTableSection from "../transaction-table/transaction-table-section"
import UserTableSection from "../user-table/user-table-section"

interface CompanyDetailsViewSectionProps {
    id: string
}

export default function CompanyDetailsViewSection({ id }: CompanyDetailsViewSectionProps) {
    const searchParams = useSearchParams()
    const urlTab = searchParams.get('tab')
    
    // Use local state for normal tab interactions
    const [activeTab, setActiveTab] = useState('users')
    
    // Only update from URL on mount or when URL tab changes (for breadcrumb navigation)
    useEffect(() => {
        if (urlTab && ['users', 'machines', 'transactions', 'parts'].includes(urlTab)) {
            setActiveTab(urlTab)
        }
    }, [urlTab])

    const tabs_list: { label: string, value: string, component: React.ReactNode }[] = [
        {
            label: "Users",
            value: "users",
            component: <UserTableSection company_id={id} />
        },
        {
            label: "Plants",
            value: "plants",
            component: <PlantTableSection company_id={id} />
        },
        {
            label: "Machines",
            value: "machines",
            component: <MatchineTableSection company_id={id} />
        },
        {
            label: "Transactions",
            value: "transactions",
            component: <TransactionTableSection company_id={id} />
        },
        {
            label: "Parts",
            value: "parts",
            component: <PartTableSection company_id={id} />
        }
    ]

    return <div>
        <CompanyDetailsCard id={id} />
        <div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="items-center gap-0">
            <div className="w-full border-b border-dashed">
      <TabsList className="text-foreground h-14 gap-2 rounded-none bg-transparent p-0">
        {tabs_list.map((tab) => (
            <TabsTrigger
                value={tab.value}
                key={tab.value}
                className="hover:bg-transparent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-transparent 
                relative after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent dark:data-[state=active]:bg-transparent data-[state=active]:shadow-none 
                data-[state=active]:rounded-none data-[state=active]:border-none"
            >
          {tab.label}
        </TabsTrigger>
        ))}
      </TabsList>
      </div>
      {tabs_list.map((tab) => (
        <TabsContent className="w-full" value={tab.value} key={tab.value}>
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
        </div>
    </div>
}