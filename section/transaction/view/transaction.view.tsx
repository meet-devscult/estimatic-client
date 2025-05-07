"use client"

import { DataTable } from "@/components/table-layout/data-table"
import { useTransactions } from "@/hooks/use-transaction"
import { Loader2 } from "lucide-react"
import { transactionTableColumn } from "../transaction-column"
import NewTransaction from "../transaction-form"

export default function TransactionViewSection() {  
  const { data, isLoading, isRefetching } = useTransactions()

  if (isLoading || isRefetching) return <div className="flex justify-center items-center h-screen">
    <Loader2 className="w-10 h-10 animate-spin" />
  </div>

  return <div>
    <div>
      <div className="flex justify-between items-center p-5 border-b border-dashed">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <NewTransaction />
      </div>
    </div>
    <DataTable columns={transactionTableColumn} data={data}  />
  </div>
}