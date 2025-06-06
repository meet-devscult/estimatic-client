import { AppSidebar } from "@/components/layout-component/app-sidebar"
import { SiteHeader } from "@/components/layout-component/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export const iframeHeight = "800px"

export const description = "A sidebar with a header and a search form."

export default function DashboardWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
          {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
