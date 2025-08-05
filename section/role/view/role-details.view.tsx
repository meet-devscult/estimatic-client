"use client"

import { Switch } from "@/components/ui/switch";
import { useState } from "react";

interface RoleDetailsViewProps {
    id: string;
}

// Static data based on the image provided
const getRoleData = (id: string) => ({
    user_id: "user2241",
    user_name: "davidelson2415", 
    last_login: "Mar 30, 2024 7:29 am",
    status: "active",
    permissions: {
        dashboard: "restricted",
        companies: "restricted", 
        transactions: "full_access",
        prompt_mang: "restricted",
        enquiries: "restricted"
    }
});

const PERMISSION_SECTIONS = [
    { key: "dashboard", label: "Dashboard" },
    { key: "companies", label: "Companies" },
    { key: "transactions", label: "Transactions" },
    { key: "prompt_mang", label: "Prompt Mang" },
    { key: "enquiries", label: "Enquiries" },
];

export default function RoleDetailsViewSection({ id }: RoleDetailsViewProps) {
    const roleData = getRoleData(id);
    const [isActive, setIsActive] = useState(roleData.status === "active");

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

    return (
        <div>
            {/* Role Details Header */}
            <div className="p-5 border-b border-dashed">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Role Details</h1>
                    <div className="flex items-center gap-2">
                        <h1 className="text-sm">
                            {isActive ? "Active" : "Inactive"}
                        </h1>
                        <Switch
                            checked={isActive}
                            onCheckedChange={setIsActive}
                        />
                    </div>
                </div>
            </div>

            {/* Role Details Information */}
            <div className="grid grid-cols-3 border-b border-dashed divide-x divide-dashed">
                <div className="divide-y divide-dashed">
                    <div className="flex items-center gap-1 p-2">
                        <h1 className="font-medium text-muted-foreground">User Login ID:</h1>
                        <p>{roleData.user_id || '-'}</p>
                    </div>
                </div>
                <div className="divide-y divide-dashed">
                    <div className="flex items-center gap-1 p-2">
                        <h1 className="font-medium text-muted-foreground">User Name:</h1>
                        <p>{roleData.user_name || '-'}</p>
                    </div>
                </div>
                <div className="divide-y divide-dashed">
                    <div className="flex items-center gap-1 p-2">
                        <h1 className="font-medium text-muted-foreground">Last Login:</h1>
                        <p>{roleData.last_login || '-'}</p>
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
                        const permission = (roleData.permissions as any)[section.key];
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