"use client"

import NotAuthorisedComponent from "@/components/not-authorised";
import { useUsersPermissions } from "@/hooks/use-user";
import { PERMISSION, PERMISSIONS } from "@/types/user.type";
import { Loader2 } from "lucide-react";
import { useState } from "react";

// ------------------------------------------------------------

export const GetPermissionGuard = ({children, route}: {children: React.ReactNode, route: keyof PERMISSIONS}) => {

    const { data: permissionsData, isLoading: isPermissionsLoading } = useUsersPermissions()
    
    // Get dynamic permissions from API response
    const dynamicPermissions = permissionsData?.data?.[3]?.permissions as PERMISSIONS;
    const permission = dynamicPermissions?.[route];

    console.log("guard 🎀Permission:", dynamicPermissions)

    if (isPermissionsLoading) return <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
    </div>

    if (permission === PERMISSION.RESTRICTED) return <NotAuthorisedComponent />;

    return <>{children}</>;
};

export const useRoutePermission = (route: keyof PERMISSIONS | "menu") => {
    const { data: permissionsData } = useUsersPermissions();
    const dynamicPermissions = permissionsData?.data?.[3]?.permissions as PERMISSIONS;
    
    const [permission, setPermission] = useState<PERMISSION>(
        route === "menu" ? PERMISSION.FULL_ACCESS : dynamicPermissions?.[route] || PERMISSION.RESTRICTED
    );
    
    console.log("hook 🎀Permission:", permission)

    return { 
        permission, 
        setPermission: (permission: PERMISSION) => setPermission(permission), 
        permissions: dynamicPermissions 
    };
};