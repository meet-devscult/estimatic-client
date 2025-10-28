import { GetPermissionGuard } from "@/guard/permission.guard"
import ComapnyViewSection from "@/section/comapny/view/company.view"

export default function CompanyPage() {
  return (
    <GetPermissionGuard route="companies"><ComapnyViewSection /></GetPermissionGuard>
  )
}