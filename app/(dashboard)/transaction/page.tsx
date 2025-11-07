import { GetPermissionGuard } from "@/guard/permission.guard";
import TransactionViewSection from "@/section/transaction/view/transaction.view";

export default function TransactionPage() {
  return (
    <GetPermissionGuard route="transactions"><TransactionViewSection /></GetPermissionGuard>
  )
}