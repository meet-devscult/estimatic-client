"use client"

import NotAuthorisedComponent from "@/components/not-authorised";
import { PERMISSION } from "@/types/user.type";
import { useState } from "react";

// ------------------------------------------------------------

export const STATIC_PERMISSION = {
    dashboard: PERMISSION.RESTRICTED,
    companies: PERMISSION.VIEW_ONLY,
    transactions: PERMISSION.VIEW_ONLY,
    enquiries: PERMISSION.RESTRICTED,
    roles: PERMISSION.RESTRICTED,
  };  

// ------------------------------------------------------------


export const GetPermissionGuard = ({children, route}: {children: React.ReactNode, route: keyof typeof STATIC_PERMISSION}) => {

    const permission = STATIC_PERMISSION[route as keyof typeof STATIC_PERMISSION];  

    if (permission === PERMISSION.RESTRICTED) return <NotAuthorisedComponent />;

    return <>{children}</>;
};

export const useRoutePermission = (route: keyof typeof STATIC_PERMISSION | "menu") => {
    const [permission, setPermission] = useState<PERMISSION>(STATIC_PERMISSION[route as keyof typeof STATIC_PERMISSION]);
    return { permission, setPermission: (permission: PERMISSION) => setPermission(permission), permissions: STATIC_PERMISSION };
};