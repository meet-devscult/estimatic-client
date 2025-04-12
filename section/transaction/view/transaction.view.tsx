"use client"

import { DataTable } from "@/components/table-layout/data-table"
import { Button } from "@/components/ui/button"
import { useTransactions } from "@/hooks/use-transaction"
import { Loader2, PlusIcon } from "lucide-react"
import AddTransactionPopup from "../../../components/form-fields-components/form-popup-layout"
import { transactionTableColumn } from "../transaction-column"
import TransactionForm from "../transaction-form"

import { TTransactionFormType } from "@/zod/transactions.zod"
import { useForm } from "react-hook-form"

export default function TransactionViewSection() {
    const { data, isLoading } = useTransactions()
    const form = useForm<TTransactionFormType>();

    const handleAddTransaction = (data: TTransactionFormType) => {
      console.log("New transaction submitted:", data);
    };

    if (isLoading) return <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
    </div>

    console.log(data)

  return <div>
    <div>
      <div className="flex justify-between items-center p-5 border-b border-dashed">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <AddTransactionPopup title="Add New Transaction" 
          triggerText={
            <Button variant="outline" size="lg" className="border-dashed hover:cursor-pointer">
              <PlusIcon />
              <span className="hidden lg:inline">Add Transaction</span>
            </Button>
          } 
          form={
            <TransactionForm
              form={form}
              onSubmit={handleAddTransaction}
            />}
            submitFunction={() => {
              handleAddTransaction(form.getValues());
          }}
          buttonText="Add Transaction"
        />        
      </div>
    </div>
    <DataTable columns={transactionTableColumn} data={data}  />
  </div>
}