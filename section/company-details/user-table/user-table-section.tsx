import { DataTable } from "@/components/table-layout/data-table";
import { Button } from "@/components/ui/button";
import { useUserByCompanyId } from "@/hooks/use-user";
import { Loader2, PlusIcon } from "lucide-react";
import { userTableColumn } from "./user-table-column";

interface UserTableSectionProps {
    company_id: string
}

export default function UserTableSection({ company_id }: UserTableSectionProps) {

    const { data: users, isLoading: isUsersLoading } = useUserByCompanyId(company_id)

    if (isUsersLoading) return <div className="flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin" />
    </div>
    return (
        <div>
            <div>
                <div className="flex justify-between items-center p-5 border-b border-dashed">
                    <h1 className="text-2xl font-bold">Users</h1>
                    <Button variant="outline" size="lg" className="border-dashed">
                        <PlusIcon />
                        <span className="hidden lg:inline">Add User</span>
                    </Button>
                </div>
            </div>
            <DataTable columns={userTableColumn} data={users} headerClassName="text-left" />
        </div>
    )
}