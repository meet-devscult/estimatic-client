import { GetPermissionGuard } from "@/guard/permission.guard";
import RoleViewSection from "@/section/role/view/role.view";

export default function RolePage() {
  return (
    <GetPermissionGuard route="roles">
      <RoleViewSection />
    </GetPermissionGuard>
  )
}