import NewTransaction from "@/section/transaction/transaction-form"
import { ITransaction } from "@/types/transaction.type"
import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"

export const transactionTableColumn: ColumnDef<ITransaction>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div >{row.original.company_name}</div>,
    },
    {
      accessorKey: "datePaid",
      header: "Date Paid",
      cell: ({ row }) => <div >{dayjs.unix(row.original.paid_time).format("DD/MM/YYYY")}</div>,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => <div >{row.original.amount}</div>,
    },
    {
      accessorKey: "validUntil",
      header: "Valid Until",
      cell: ({ row }) => <div >{dayjs.unix(row.original.upto_validated_at).format("DD/MM/YYYY")}</div>,
    },
    {
      accessorKey: "paidVia",
      header: "Paid Via",
      cell: ({ row }) => <div >{row.original.payment_mode}</div>,
    }, 
    {
      accessorKey: "paidFor",
      header: "Paid For",
      cell: ({ row }) => <div >{row.original.plan}</div>,
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