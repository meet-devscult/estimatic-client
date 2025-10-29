"use client"

import { useCompanyAdminUsersDetails } from "@/hooks/use-user";
import { Loader2 } from "lucide-react";

interface RoleDetailsViewProps {
    id: string;
}

const PERMISSION_SECTIONS = [
    { key: "dashboard", label: "Dashboard" },
    { key: "companies", label: "Companies" },
    { key: "transactions", label: "Transactions" },
    { key: "enquiries", label: "Enquiries" },
    { key: "roles", label: "Roles" },
];

export default function RoleDetailsViewSection({ id }: RoleDetailsViewProps) {
    const { data: roleData, isLoading: isRoleDataLoading } = useCompanyAdminUsersDetails(id);

    const getPermissionDisplay = (permission: string) => {
        switch (permission) {
            case "full_access":
                return { fullAccess: "Accessible", viewOnly: "-", restricted: "-" };
            case "view_only":
                return { fullAccess: "-", viewOnly: "Accessible", restricted: "-" };
            case "restricted":
                return { fullAccess: "-", viewOnly: "-", restricted: "Accessible" };
            default:
                return { fullAccess: "-", viewOnly: "-", restricted: "-" };
        }
    };

    if (isRoleDataLoading) return <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
    </div>

    const {status, email, user_name, permissions, last_login} = roleData.data[0]

    return (
        <div>
            {/* Role Details Header */}
            <div className="p-5 border-b border-dashed">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Role Details</h1>
                    {/* <div className="flex items-center gap-2">
                        <h1 className="text-sm">
                            {status === "active" ? "Active" : "Inactive"}
                        </h1>
                        <Switch
                            checked={status === "active"}
                            onCheckedChange={() => {}}
                        />
                    </div> */}
                </div>
            </div>

            {/* Role Details Information */}
            <div className="grid grid-cols-3 border-b border-dashed divide-x divide-dashed">
                <div className="divide-y divide-dashed">
                    <div className="flex items-center gap-1 p-2">
                        <h1 className="font-medium text-muted-foreground">User Login Email:</h1>
                        <p>{email || '-'}</p>
                    </div>
                </div>
                <div className="divide-y divide-dashed">
                    <div className="flex items-center gap-1 p-2">
                        <h1 className="font-medium text-muted-foreground">User Name:</h1>
                        <p>{user_name || '-'}</p>
                    </div>
                </div>
                <div className="divide-y divide-dashed">
                    <div className="flex items-center gap-1 p-2">
                        <h1 className="font-medium text-muted-foreground">Last Login:</h1>
                        <p>{last_login || '-'}</p>
                    </div>
                </div>
            </div>

            {/* Permissions Section */}
            <div className="space-y-5">
                <h2 className="text-xl font-bold px-5 pt-5">Permissions</h2>
                
                {/* Permissions Table */}
                <div className="border border-dashed overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-4 bg-muted/50">
                        <div className="p-4 font-medium border-r border-dashed">Section</div>
                        <div className="p-4 font-medium text-center">Full Access</div>
                        <div className="p-4 font-medium text-center">View Only</div>
                        <div className="p-4 font-medium text-center">Restrict Access</div>
                    </div>
                    
                    {/* Table Rows */}
                    {PERMISSION_SECTIONS.map((section, index) => {
                        const permission = permissions[section.key];
                        const display = getPermissionDisplay(permission);
                        
                        return (
                            <div 
                                key={section.key} 
                                className={`grid grid-cols-4 ${index !== PERMISSION_SECTIONS.length - 1 ? 'border-b border-dashed' : ''}`}
                            >
                                <div className="p-4 border-r border-dashed font-medium">
                                    {section.label}
                                </div>
                                <div className="p-4 text-center text-sm">
                                    {display.fullAccess}
                                </div>
                                <div className="p-4 text-center text-sm">
                                    {display.viewOnly}
                                </div>
                                <div className="p-4 text-center text-sm">
                                    {display.restricted}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}