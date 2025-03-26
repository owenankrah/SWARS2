"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Car,
  FileText,
  Home,
  Upload,
  Search,
  ClipboardCheck,
  CheckSquare,
  Users,
  MessageSquare,
  CreditCard,
  Star,
  BarChart3,
  Settings,
  LogOut,
  Building,
  FileBarChart,
  ShieldCheck,
  AlertTriangle,
  Clock,
  UserCheck,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/lib/auth-context"
import { hasPermission } from "@/lib/access-control"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  if (!user) return null

  const userRole = user.role

  // Define navigation items based on user role
  const navItems = [
    // DVLA Navigation
    ...(userRole === "dvla"
      ? [
          {
            title: "DVLA",
            items: [
              {
                title: "Dashboard",
                href: "/dashboard/dvla/dashboard",
                icon: Home,
                variant: "default",
              },
              {
                title: "Damage Assessment",
                href: "/dashboard/dvla/damage-assessment",
                icon: Car,
                variant: "ghost",
              },
              {
                title: "Upload Evidence",
                href: "/dashboard/dvla/upload-evidence",
                icon: Upload,
                variant: "ghost",
              },
              {
                title: "Update Reports",
                href: "/dashboard/dvla/update-report",
                icon: FileText,
                variant: "ghost",
              },
              {
                title: "Search",
                href: "/dashboard/dvla/search",
                icon: Search,
                variant: "ghost",
              },
            ],
          },
        ]
      : []),

    // Police Navigation
    ...(userRole === "police"
      ? [
          {
            title: "Police",
            items: [
              {
                title: "Dashboard",
                href: "/dashboard/police/dashboard",
                icon: Home,
                variant: "default",
              },
              {
                title: "Create Report",
                href: "/dashboard/police/create-report",
                icon: FileText,
                variant: "ghost",
              },
              {
                title: "Update Reports",
                href: "/dashboard/police/update-report",
                icon: ClipboardCheck,
                variant: "ghost",
              },
              {
                title: "Approve Reports",
                href: "/dashboard/police/approve-reports",
                icon: CheckSquare,
                variant: "ghost",
              },
              {
                title: "Pending Approvals",
                href: "/dashboard/police/pending-approvals",
                icon: Clock,
                variant: "ghost",
              },
              {
                title: "Search",
                href: "/dashboard/police/search",
                icon: Search,
                variant: "ghost",
              },
            ],
          },
        ]
      : []),

    // Insurance Navigation
    ...(userRole === "insurance"
      ? [
          {
            title: "Insurance",
            items: [
              {
                title: "Dashboard",
                href: "/dashboard/insurance/dashboard",
                icon: Home,
                variant: "default",
              },
              {
                title: "Claims",
                href: "/dashboard/insurance/claims",
                icon: FileBarChart,
                variant: "ghost",
              },
              {
                title: "Subrogation",
                href: "/dashboard/insurance/subrogation",
                icon: ShieldCheck,
                variant: "ghost",
              },
              {
                title: "Fraud Detection",
                href: "/dashboard/insurance/fraud",
                icon: AlertTriangle,
                variant: "ghost",
              },
              {
                title: "Search",
                href: "/dashboard/insurance/search",
                icon: Search,
                variant: "ghost",
              },
            ],
          },
        ]
      : []),

    // NIC Navigation
    ...(userRole === "nic"
      ? [
          {
            title: "NIC",
            items: [
              {
                title: "Dashboard",
                href: "/dashboard/nic/dashboard",
                icon: Home,
                variant: "default",
              },
              {
                title: "Companies",
                href: "/dashboard/nic/companies",
                icon: Building,
                variant: "ghost",
              },
              {
                title: "Compliance",
                href: "/dashboard/nic/compliance",
                icon: CheckSquare,
                variant: "ghost",
              },
              {
                title: "Search",
                href: "/dashboard/nic/search",
                icon: Search,
                variant: "ghost",
              },
            ],
          },
        ]
      : []),

    // Driver Navigation
    ...(userRole === "driver"
      ? [
          {
            title: "Driver",
            items: [
              {
                title: "Dashboard",
                href: "/dashboard/driver/dashboard",
                icon: Home,
                variant: "default",
              },
              {
                title: "Initiate Claim",
                href: "/dashboard/driver/initiate-claim",
                icon: FileText,
                variant: "ghost",
              },
              {
                title: "Claims History",
                href: "/dashboard/driver/claims-history",
                icon: ClipboardCheck,
                variant: "ghost",
              },
              {
                title: "Claim Status",
                href: "/dashboard/driver/claim-status",
                icon: Clock,
                variant: "ghost",
              },
              {
                title: "Driver Rating",
                href: "/dashboard/driver/rating",
                icon: Star,
                variant: "ghost",
              },
              {
                title: "Vehicles",
                href: "/dashboard/driver/vehicles",
                icon: Car,
                variant: "ghost",
              },
              {
                title: "Messages",
                href: "/dashboard/driver/messages",
                icon: MessageSquare,
                variant: "ghost",
              },
              {
                title: "Premium",
                href: "/dashboard/driver/premium",
                icon: CreditCard,
                variant: "ghost",
              },
            ],
          },
        ]
      : []),

    // Admin Navigation
    ...(userRole === "admin" || hasPermission(user, "admin_access")
      ? [
          {
            title: "Administration",
            items: [
              {
                title: "Dashboard",
                href: "/dashboard/admin/dashboard",
                icon: BarChart3,
                variant: "default",
              },
              {
                title: "User Management",
                href: "/dashboard/admin/users",
                icon: Users,
                variant: "ghost",
              },
              {
                title: "Role Management",
                href: "/dashboard/admin/roles",
                icon: UserCheck,
                variant: "ghost",
              },
              {
                title: "Settings",
                href: "/dashboard/admin/settings",
                icon: Settings,
                variant: "ghost",
              },
            ],
          },
        ]
      : []),
  ]

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Accident Reporting System</h2>
          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start" asChild>
              <Link href={`/dashboard/${userRole}/dashboard`}>
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          {navItems.map((section, i) => (
            <div key={i} className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">{section.title}</h2>
              <div className="space-y-1">
                {section.items.map((item, j) => (
                  <Button
                    key={j}
                    asChild
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Link href={item.href}>
                      {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                      {item.title}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          ))}
          <div className="px-3 py-2">
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:bg-red-100 hover:text-red-700"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

