import { Button } from "@/components/ui/button"
import { ITransaction } from "@/types/transaction.type"
import { ColumnDef } from "@tanstack/react-table"

export const transactionTableColumn: ColumnDef<ITransaction>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="text-center" >{row.original.name}</div>,
    },
    {
      accessorKey: "datePaid",
      header: "Date Paid",
      cell: ({ row }) => <div className="text-center" >{row.original.datePaid}</div>,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => <div className="text-center" >{row.original.amount}</div>,
    },
    {
      accessorKey: "validUntil",
      header: "Valid Until",
      cell: ({ row }) => <div className="text-center" >{row.original.validUntil}</div>,
    },
    {
      accessorKey: "paidVia",
      header: "Paid Via",
      cell: ({ row }) => <div className="text-center" >{row.original.paidVia}</div>,
    }, 
    {
      accessorKey: "paidFor",
      header: "Paid For",
      cell: ({ row }) => <div className="text-center" >{row.original.paidFor}</div>,
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