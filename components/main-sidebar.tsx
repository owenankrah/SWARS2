"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { usePermissions } from "@/hooks/use-permissions"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar"

interface SidebarItem {
  title: string
  href: string
  icon?: React.ReactNode
  permission?: string
  items?: SidebarItem[]
}

interface SidebarSection {
  title: string
  items: SidebarItem[]
}

interface MainSidebarProps {
  children: React.ReactNode
}

export function MainSidebarWrapper({ children }: MainSidebarProps) {
  const { user } = useAuth()
  const { hasPermission } = usePermissions()
  const pathname = usePathname()

  // Define sidebar sections based on user role
  const adminSidebar: SidebarSection[] = [
    {
      title: "Administration",
      items: [
        {
          title: "Dashboard",
          href: "/admin/dashboard",
          permission: "access_admin_portal",
        },
        {
          title: "User Management",
          href: "/admin/users",
          permission: "manage_users",
        },
        {
          title: "System Settings",
          href: "/admin/settings",
          permission: "access_admin_portal",
        },
      ],
    },
  ]

  const policeSidebar: SidebarSection[] = [
    {
      title: "Police Operations",
      items: [
        {
          title: "Dashboard",
          href: "/police/dashboard",
          permission: "access_police_portal",
        },
        {
          title: "Create Report",
          href: "/police/create-report",
          permission: "create_reports",
        },
        {
          title: "Pending Approvals",
          href: "/police/pending-approvals",
          permission: "approve_reports",
        },
        {
          title: "Report History",
          href: "/police/reports",
          permission: "view_reports",
        },
      ],
    },
  ]

  const insuranceSidebar: SidebarSection[] = [
    {
      title: "Insurance Operations",
      items: [
        {
          title: "Dashboard",
          href: "/insurance/dashboard",
          permission: "access_insurance_portal",
        },
        {
          title: "Claims Management",
          href: "/insurance/claims",
          permission: "manage_claims",
        },
        {
          title: "Driver History",
          href: "/insurance/driver-history",
          permission: "view_driver_history",
        },
        {
          title: "Subrogation",
          href: "/insurance/subrogation",
          permission: "manage_subrogation",
        },
      ],
    },
  ]

  const dvlaSidebar: SidebarSection[] = [
    {
      title: "DVLA Operations",
      items: [
        {
          title: "Dashboard",
          href: "/dvla/dashboard",
          permission: "access_dvla_portal",
        },
        {
          title: "Driver Records",
          href: "/dvla/drivers",
          permission: "view_driver_history",
        },
        {
          title: "Vehicle Records",
          href: "/dvla/vehicles",
          permission: "access_dvla_portal",
        },
      ],
    },
  ]

  const nicSidebar: SidebarSection[] = [
    {
      title: "NIC Operations",
      items: [
        {
          title: "Dashboard",
          href: "/nic/dashboard",
          permission: "access_nic_portal",
        },
        {
          title: "Insurance Companies",
          href: "/nic/companies",
          permission: "access_nic_portal",
        },
        {
          title: "Accident Statistics",
          href: "/nic/statistics",
          permission: "view_statistics",
        },
        {
          title: "Subrogation",
          href: "/nic/subrogation",
          permission: "manage_subrogation",
        },
      ],
    },
  ]

  const driverSidebar: SidebarSection[] = [
    {
      title: "Driver Portal",
      items: [
        {
          title: "Dashboard",
          href: "/driver/dashboard",
          permission: "access_driver_portal",
        },
        {
          title: "Report Accident",
          href: "/driver/report-accident",
          permission: "create_reports",
        },
        {
          title: "My Reports",
          href: "/driver/my-reports",
          permission: "access_driver_portal",
        },
        {
          title: "My History",
          href: "/driver/history",
          permission: "access_driver_portal",
        },
      ],
    },
  ]

  // Determine which sidebar to show based on the current path
  let sidebarSections: SidebarSection[] = []

  if (pathname.startsWith("/admin")) {
    sidebarSections = adminSidebar
  } else if (pathname.startsWith("/police")) {
    sidebarSections = policeSidebar
  } else if (pathname.startsWith("/insurance")) {
    sidebarSections = insuranceSidebar
  } else if (pathname.startsWith("/dvla")) {
    sidebarSections = dvlaSidebar
  } else if (pathname.startsWith("/nic")) {
    sidebarSections = nicSidebar
  } else if (pathname.startsWith("/driver")) {
    sidebarSections = driverSidebar
  }

  // Filter sidebar items based on user permissions
  const filteredSections = sidebarSections.map((section) => ({
    ...section,
    items: section.items.filter((item) => {
      // If user is superuser, show all items
      if (user?.isSuperuser) return true

      // If item has permission requirement, check it
      if (item.permission) {
        return hasPermission(item.permission)
      }

      // Default to showing the item
      return true
    }),
  }))

  return (
    <SidebarProvider>
      <div className="flex">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b px-6 py-3">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-primary" />
              <span className="text-lg font-semibold">
                {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)} Portal
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            {filteredSections.map((section) => (
              <SidebarGroup key={section.title}>
                <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item) => (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton asChild isActive={pathname === item.href}>
                          <Link href={item.href}>
                            <span className="flex items-center">
                              {item.icon && <span className="mr-2">{item.icon}</span>}
                              {item.title}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <div className="flex-1">{children}</div>
      </div>
    </SidebarProvider>
  )
}

