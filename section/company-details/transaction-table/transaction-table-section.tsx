import { DataTable } from "@/components/table-layout/data-table";
import data from "@/db.json";
import NewTransection from "@/section/transaction/transaction-form";
import { ITransaction } from "@/types/transaction.type";
import { transactionTableColumn } from "./transaction-table-column";
interface TransactionTableSectionProps {
    company_id: string
}

export default function TransactionTableSection({ company_id }: TransactionTableSectionProps) {

    // const { data: transactions, isLoading: isTransactionsLoading } = useTransactionByCompanyId(company_id)

    // if (isTransactionsLoading) return <div className="flex justify-center items-center">
    //     <Loader2 className="w-10 h-10 animate-spin" />
    // </div>
    return (
        <div>
            <div>
                <div className="flex justify-between items-center p-5 border-b border-dashed">
                    <h1 className="text-2xl font-bold">Transactions</h1>
                    <NewTransection />
                </div>
            </div>
            <DataTable columns={transactionTableColumn} data={data.transactions as unknown as ITransaction[]} headerClassName="text-left" />
        </div>
    )
}