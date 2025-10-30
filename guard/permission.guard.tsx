"use client"

import NotAuthorisedComponent from "@/components/not-authorised";
import { PERMISSION, PERMISSIONS } from "@/types/user.type";
import { usePermissions } from "./permission.store";

export const GetPermissionGuard = ({children, route}: {children: React.ReactNode, route: keyof PERMISSIONS}) => {
    const { getPermission } = usePermissions();

    if ((getPermission(route)) === PERMISSION.RESTRICTED) return <NotAuthorisedComponent />;

    return <>{children}</>;
};

export const GetPermissionGuardForCreate = ({children, route}: {children: React.ReactNode, route: keyof PERMISSIONS}) => {
    const { getPermission } = usePermissions();

    if ((getPermission(route)) !== PERMISSION.FULL_ACCESS) return <NotAuthorisedComponent />;

    return <>{children}</>;
};