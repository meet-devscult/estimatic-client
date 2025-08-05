"use client";

import { useCompanyById } from "@/hooks/use-company";
import { useMachineById } from "@/hooks/use-machine";
import { usePartById } from "@/hooks/use-part";
import { useUserById } from "@/hooks/use-user";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb";

// Configuration for static labels and UUID patterns
const ROUTE_CONFIG = {
  staticLabels: {
    company: "Companies",
    machine: "Machines", 
    user: "Users",
    part: "Parts",
    transaction: "Transactions",
    role: "Roles",
    create: "Create New",
  },
  // UUID pattern to detect entity IDs
  uuidPattern: /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i
};

export default function DynamicBreadcrumb() {
  const pathname = usePathname();
  const pathnames = pathname.split('/').filter(Boolean);

  // Extract entity IDs from the path
  const entityIds = useMemo(() => {
    const ids: { [key: string]: string } = {};
    
    for (let i = 0; i < pathnames.length; i++) {
      const segment = pathnames[i];
      const prevSegment = pathnames[i - 1];
      
      // Check if current segment is a UUID and previous segment indicates entity type
      if (prevSegment && ROUTE_CONFIG.uuidPattern.test(segment)) {
        ids[prevSegment] = segment;
      }
    }
    
    return ids;
  }, [pathnames]);

  // Fetch entity data only when we have IDs
  const { data: companyData, isLoading: companyLoading } = useCompanyById(entityIds.company || "");
  const { data: machineData, isLoading: machineLoading } = useMachineById(entityIds.machine || "");
  const { data: userData, isLoading: userLoading } = useUserById(entityIds.user || "");
  const { data: partData, isLoading: partLoading } = usePartById(entityIds.part || "");

  // Process breadcrumb segments with proper navigation
  const breadcrumbSegments = useMemo(() => {
    const segments = [];
    
    for (let i = 0; i < pathnames.length; i++) {
      const segment = pathnames[i];
      const prevSegment = pathnames[i - 1];
      let href = `/${pathnames.slice(0, i + 1).join('/')}`;
      let label = segment;
      let isEntity = false;
      let isLoading = false;
      
      // Check if this segment is a UUID (entity ID)
      if (ROUTE_CONFIG.uuidPattern.test(segment) && prevSegment) {
        isEntity = true;
        
        // Get entity name based on type
        switch (prevSegment) {
          case 'company':
            label = companyData?.name || segment;
            isLoading = companyLoading && !companyData;
            break;
          case 'machine':
            label = machineData?.data?.name || segment;
            isLoading = machineLoading && !machineData;
            break;
          case 'user':
            label = userData?.data?.user_name || segment;
            isLoading = userLoading && !userData;
            break;
          case 'part':
            label = partData?.data?.name || segment;
            isLoading = partLoading && !partData;
            break;
        }
      } else {
        // Static route segment
        label = ROUTE_CONFIG.staticLabels[segment as keyof typeof ROUTE_CONFIG.staticLabels] || 
               segment.charAt(0).toUpperCase() + segment.slice(1);
               
        // Special handling for navigation paths that need redirection
        if (prevSegment && ROUTE_CONFIG.uuidPattern.test(pathnames[i - 1])) {
          switch (segment) {
            case 'machine':
              // If we're at /company/{id}/machine, redirect to company page with machines tab
              href = `/${pathnames.slice(0, i).join('/')}?tab=machines`;
              break;
            case 'user':
              // If we're at /company/{id}/user, redirect to company page with users tab
              href = `/${pathnames.slice(0, i).join('/')}?tab=users`;
              break;
            case 'part':
              // If we're at /company/{id}/part, redirect to company page with parts tab
              href = `/${pathnames.slice(0, i).join('/')}?tab=parts`;
              break;
          }
        }
      }
      
      segments.push({ label, href, isEntity, isLoading });
    }
    
    return segments;
  }, [pathnames, companyData, machineData, userData, partData, companyLoading, machineLoading, userLoading, partLoading]);

  if (pathnames.length === 0) return null;

  return (
    <Breadcrumb className="hidden sm:block">
      <BreadcrumbList>
        {breadcrumbSegments.map((segment, index) => {
          const isLastItem = index === breadcrumbSegments.length - 1;
          
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {isLastItem ? (
                  <span className="font-medium text-foreground">
                    {segment.isLoading ? (
                      <span className="inline-flex items-center gap-1">
                        <span className="h-4 w-16 animate-pulse rounded bg-muted"></span>
                      </span>
                    ) : (
                      segment.label
                    )}
                  </span>
                ) : (
                  <BreadcrumbLink 
                    href={segment.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {segment.isLoading ? (
                      <span className="inline-flex items-center gap-1">
                        <span className="h-4 w-12 animate-pulse rounded bg-muted"></span>
                      </span>
                    ) : (
                      segment.label
                    )}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLastItem && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}