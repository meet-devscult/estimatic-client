import { GetPermissionGuardForCreate } from "@/guard/permission.guard";
import RoleCreateView from "@/section/role/view/role-create.view";

export default function CreateRolePage() {
  return <GetPermissionGuardForCreate route="roles"><RoleCreateView /></GetPermissionGuardForCreate>;
}
