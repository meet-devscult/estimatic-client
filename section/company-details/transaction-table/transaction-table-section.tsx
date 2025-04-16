import { DataTable } from "@/components/table-layout/data-table";
import { useTransactionByCompanyId } from "@/hooks/use-transaction";
import NewTransection from "@/section/transaction/transaction-form";
import { Loader2 } from "lucide-react";
import { transactionTableColumn } from "./transaction-table-column";

interface TransactionTableSectionProps {
    company_id: string
}

export default function TransactionTableSection({ company_id }: TransactionTableSectionProps) {

    const { data: transactions, isLoading: isTransactionsLoading } = useTransactionByCompanyId(company_id)

    if (isTransactionsLoading) return <div className="flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin" />
    </div>
    return (
        <div>
            <div>
                <div className="flex justify-between items-center p-5 border-b border-dashed">
                    <h1 className="text-2xl font-bold">Transactions</h1>
                    <NewTransection />
                </div>
            </div>
            <DataTable columns={transactionTableColumn} data={transactions} headerClassName="text-left" />
        </div>
    )
}