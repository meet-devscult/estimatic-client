import { ITransaction } from "@/types/transaction.type"
import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"
import NewTransaction from "./transaction-form"


export const transactionTableColumn: ColumnDef<ITransaction>[] = [
    {
      accessorKey: "company_name",
      header: "Name",
      cell: ({ row }) => <div className="text-center" >{row.original.company_name}</div>,
    },
    {
      accessorKey: "paid_time",
      header: "Date Paid",
      cell: ({ row }) => <div className="text-center" >{dayjs.unix(row.original.paid_time).format("DD/MM/YYYY")}</div>,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => <div className="text-center" >{row.original.amount}</div>,
    },
    {
      accessorKey: "upto_validated_at",
      header: "Valid Until",
      cell: ({ row }) => <div className="text-center" >{dayjs.unix(row.original.upto_validated_at).format("DD/MM/YYYY")}</div>,
    },
    {
      accessorKey: "payment_mode",
      header: "Paid Via",
      cell: ({ row }) => <div className="text-center capitalize" >{row.original.payment_mode}</div>,
    }, 
    {
      accessorKey: "plan",
      header: "Plan",
      cell: ({ row }) => <div className="text-center" >{row.original.plan}</div>,
    }, 
    {
        accessorKey: "action",
        header: " ",
        cell: ({ row }) => <div className="flex items-center justify-end gap-2">
            {/* <Button variant="outline" size="sm">
              Edit Info
            </Button> */}
            <NewTransaction defaultValues={{
                name: row.original.company_name,
                datePaid: dayjs(row.original.paid_time).toDate(),
                amount: row.original.amount,
                validUntil: dayjs(row.original.upto_validated_at).toDate(),
                paidVia: row.original.payment_mode as 'UPI' | 'Cash' | 'Cheque' | 'Bank Transfer',
                paidFor: row.original.plan as 'Free' | 'Pro',
            }} />
        </div>,
    },
  ]