import { Button } from "@/components/ui/button"
import { ITransaction } from "@/types/transaction.type"
import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"

export const transactionTableColumn: ColumnDef<ITransaction>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div >{row.original.name}</div>,
    },
    {
      accessorKey: "datePaid",
      header: "Date Paid",
      cell: ({ row }) => <div >{dayjs.unix(row.original.datePaid).format("DD/MM/YYYY")}</div>,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => <div >{row.original.amount}</div>,
    },
    {
      accessorKey: "validUntil",
      header: "Valid Until",
      cell: ({ row }) => <div >{dayjs.unix(row.original.validUntil).format("DD/MM/YYYY")}</div>,
    },
    {
      accessorKey: "paidVia",
      header: "Paid Via",
      cell: ({ row }) => <div >{row.original.paidVia}</div>,
    }, 
    {
      accessorKey: "paidFor",
      header: "Paid For",
      cell: ({ row }) => <div >{row.original.paidFor}</div>,
    }, 
    {
        accessorKey: "action",
        header: " ",
        cell: () => <div className="flex items-center justify-end gap-2">
            <Button variant="outline" size="sm">
              Edit Info
            </Button>
        </div>,
    },
  ]