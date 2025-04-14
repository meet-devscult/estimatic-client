import { ITransaction } from "@/types/transaction.type"
import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"
import NewTransaction from "./transaction-form"


export const transactionTableColumn: ColumnDef<ITransaction>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="text-center" >{row.original.name}</div>,
    },
    {
      accessorKey: "datePaid",
      header: "Date Paid",
      cell: ({ row }) => <div className="text-center" >{dayjs.unix(row.original.datePaid).format("DD/MM/YYYY")}</div>,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => <div className="text-center" >{row.original.amount}</div>,
    },
    {
      accessorKey: "validUntil",
      header: "Valid Until",
      cell: ({ row }) => <div className="text-center" >{dayjs.unix(row.original.validUntil).format("DD/MM/YYYY")}</div>,
    },
    {
      accessorKey: "paidVia",
      header: "Paid Via",
      cell: ({ row }) => <div className="text-center capitalize" >{row.original.paidVia}</div>,
    }, 
    {
      accessorKey: "paidFor",
      header: "Paid For",
      cell: ({ row }) => <div className="text-center" >{row.original.paidFor}</div>,
    }, 
    {
        accessorKey: "action",
        header: " ",
        cell: ({ row }) => <div className="flex items-center justify-end gap-2">
            {/* <Button variant="outline" size="sm">
              Edit Info
            </Button> */}
            <NewTransaction defaultValues={{
                name: row.original.name,
                datePaid: dayjs(row.original.datePaid).toDate(),
                amount: row.original.amount,
                validUntil: dayjs(row.original.validUntil).toDate(),
                paidVia: row.original.paidVia as 'UPI' | 'Cash' | 'Cheque' | 'Bank Transfer',
                paidFor: row.original.paidFor as 'Free' | 'Pro',
            }} />
        </div>,
    },
  ]