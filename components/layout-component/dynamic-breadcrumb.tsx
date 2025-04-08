import { usePathname } from "next/navigation";
import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb";


export default function DynamicBreadcrumb() {

    const pathname = usePathname()

    const pathnames = pathname.split('/').filter(Boolean)
    
  return (
    <Breadcrumb className="hidden sm:block">
    <BreadcrumbList>
      {pathnames.map((name, index) => {
        const isLastItem = index === pathnames.length - 1;
        const href = `/${pathnames.slice(0, index + 1).join('/')}`;
        
        return (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {isLastItem ? (
                <span className="capitalize">{name}</span>
              ) : (
                <BreadcrumbLink href={href} className="capitalize">
                  {name}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!isLastItem && <BreadcrumbSeparator />}
          </React.Fragment>
        );
      })}
    </BreadcrumbList>
  </Breadcrumb>
  )
}