"use client"

import UserDetailCard from "@/components/detail-cards/user-detail-card"
import { DataTable } from "@/components/table-layout/data-table"
import { useUserById, useUserPartsByCompanyId } from "@/hooks/use-user"
import { partTableColumn } from "@/section/company-details/parts-table/part-table-column"

export default function UserDetailsViewSection({ userId, companyId }: { userId: string, companyId: string }) {
    const { data: user, isLoading: isUserLoading } = useUserById(userId)
    const { data: parts, isLoading: isPartsLoading } = useUserPartsByCompanyId(userId, companyId)
    
    if (isUserLoading || isPartsLoading) return <div>Loading...</div>
    if (!user) return <div>User not found</div>
    
    return <div>
        <UserDetailCard user={user} />
        <div>
                <div className="flex justify-between items-center p-5 border-b border-dashed">
                    <h1 className="text-2xl font-bold">Parts</h1>
                </div>
            </div>
            <DataTable columns={partTableColumn} data={parts} headerClassName="text-center" />
        </div>
}