import { GetPermissionGuardForCreate } from "@/guard/permission.guard";
import CompanyCreationView from "@/section/comapny/view/company-creation.view";

export default function CompanyCreationPage() {
    return (
       <GetPermissionGuardForCreate route="companies"><CompanyCreationView /></GetPermissionGuardForCreate>
    )
}