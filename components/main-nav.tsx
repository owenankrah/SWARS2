"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Sidebar } from "./sidebar"
import { DriverSidebar } from "./driver-sidebar"
import { useState } from "react"

export function MainNav() {
  const pathname = usePathname()
  const { user } = useAuth()
  const [open, setOpen] = useState(false)

  if (!user) return null

  const isDriverPath = pathname.startsWith("/driver")
  const currentRole = isDriverPath ? "driver" : user.role

  const navItems = [
    {
      title: "Dashboard",
      href: `/${currentRole}/dashboard`,
      visible: true,
    },
  ]

  // Add role-specific navigation items
  if (currentRole === "admin") {
    navItems.push(
      {
        title: "Users",
        href: "/admin/users",
        visible: true,
      },
      {
        title: "Settings",
        href: "/admin/settings",
        visible: true,
      },
    )
  } else if (currentRole === "police") {
    navItems.push(
      {
        title: "Create Report",
        href: "/police/create-report",
        visible: true,
      },
      {
        title: "Pending Approvals",
        href: "/police/pending-approvals",
        visible: true,
      },
    )
  } else if (currentRole === "dvla") {
    navItems.push(
      {
        title: "Upload Evidence",
        href: "/dvla/upload",
        visible: true,
      },
      {
        title: "Vehicle Database",
        href: "/dvla/vehicle-database",
        visible: true,
      },
    )
  } else if (currentRole === "insurance") {
    navItems.push(
      {
        title: "Claims",
        href: "/insurance/claims",
        visible: true,
      },
      {
        title: "Subrogation",
        href: "/insurance/subrogation",
        visible: true,
      },
    )
  } else if (currentRole === "nic") {
    navItems.push(
      {
        title: "Monitoring",
        href: "/nic/monitoring",
        visible: true,
      },
      {
        title: "Statistics",
        href: "/nic/statistics",
        visible: true,
      },
    )
  } else if (currentRole === "driver") {
    navItems.push(
      {
        title: "My Vehicles",
        href: "/driver/vehicles",
        visible: true,
      },
      {
        title: "Claims History",
        href: "/driver/claims-history",
        visible: true,
      },
    )
  }

  return (
    <div className="flex items-center">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="mr-4 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-0">
          {isDriverPath ? <DriverSidebar /> : <Sidebar />}
        </SheetContent>
      </Sheet>

      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <span className="hidden font-bold sm:inline-block">Accident Reporting System</span>
      </Link>

      <nav className="flex items-center space-x-4 lg:space-x-6 ml-6">
        {navItems
          .filter((item) => item.visible)
          .map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              asChild
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Link href={item.href}>{item.title}</Link>
            </Button>
          ))}
      </nav>
    </div>
  )
}

