import FilterPannel from "@/components/filter-pannel";
import { DataTable } from "@/components/table-layout/data-table";
import { useTransactionByCompanyId } from "@/hooks/use-transaction";
import NewTransection from "@/section/transaction/transaction-form";
import { Loader2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { transactionTableColumn } from "./transaction-table-column";

interface TransactionTableSectionProps {
    company_id: string
}

export default function TransactionTableSection({ company_id }: TransactionTableSectionProps) {

    const defaultFilter = {
        search: "",
        payment_mode: "",
        paid_time: "",
        upto_validated_at: "",
      }
    
      const [filter, setFilter] = useState(defaultFilter)
      const [isApplyingFilters, startTransition] = useTransition()
    
      const handleFilterChange = (newFilter: { search?: string; payment_mode?: string; paid_time?: string; upto_validated_at?: string }) => {
        setFilter(prev => ({
          ...prev,
          ...newFilter
        }))
      }

    const { data: transactions, isLoading: isTransactionsLoading, refetch, isFetching } = useTransactionByCompanyId({ companyId: company_id, ...filter })

    useEffect(() => {
        startTransition(async() => {
          await refetch()
        })
    }, [filter])

    if (isTransactionsLoading) return <div className="flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin" />
    </div>
    return (
        <div>
            <div>
                <div className="flex justify-between items-center p-5 border-b border-dashed">
                    <h1 className="text-2xl font-bold">Transactions</h1>
                    <NewTransection companyId={company_id} />
                </div>
            </div>
            <FilterPannel
                isSearchInput
                placeholderForSearchInput="Search Company Name"
                searchbarClassName="w-[300px]"
                filterValues={filter}
                onFilterValuesChange={handleFilterChange}
                defaultFilterValues={defaultFilter}
                isPaymentModeFilter
                isPaidTimeFilter
                placeholderForPaidTimeFilter="Start Date & Time"
                paidTimeClassName="w-[200px]"
                isUptoValidatedAtFilter
                placeholderForUptoValidatedAtFilter="End Date & Time"
                uptoValidatedAtClassName="w-[200px]"
            />
            {(isFetching && isApplyingFilters) ? <div className="flex justify-center items-center mt-10">
                <Loader2 className="w-10 h-10 animate-spin" /> 
                <span className="ml-2">Applying Filters...</span>
            </div> : <DataTable columns={transactionTableColumn} data={transactions || []} headerClassName="text-left" />}
        </div>
    )
}