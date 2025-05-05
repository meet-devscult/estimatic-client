"use client"

import {
  Banknote,
  Building2,
  Gauge,
  HexagonIcon,
  LifeBuoy,
  MessagesSquare,
  Send,
  Users2
} from "lucide-react"
import * as React from "react"

import { appConfig } from "@/app-config"
import { NavMain } from "@/components/layout-component/nav-main"
import { NavSecondary } from "@/components/layout-component/nav-secondary"
import { NavUser } from "@/components/layout-component/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: Gauge,
      // items: [
      //   {
      //     title: "Genesis",
      //     url: "#",
      //   },
      //   {
      //     title: "Explorer",
      //     url: "#",
      //   },
      //   {
      //     title: "Quantum",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "Companies",
      url: "/company",
      icon: Building2,
      isActive: true,
    },
    {
      title: "Transactions",
      url: "/transaction",
      icon: Banknote,
    },
    {
      title: "Roles",
      url: "/role",
      icon: Users2,
    },
    {
      title: "Enquiries",
      url: "#",
      icon: MessagesSquare,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  // const user = JSON.parse(document.cookie.split('; ').find(row => row.startsWith('user_data='))?.split('=')[1] || '{}');
  const user = {
    user_name: "John Doe",
    email: "john.doe@example.com",
    image: "https://github.com/shadcn.png",
  }
  
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]! border-dashed"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="text-primary flex aspect-square size-8 items-center justify-center rounded-lg">
                  <HexagonIcon className="size-6" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{appConfig.name}</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
