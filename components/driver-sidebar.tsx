"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, FileText, Car, Shield, Settings, LogOut, MessageSquare, Star, CreditCard } from "lucide-react"

export function DriverSidebar({ className }: { className?: string }) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  if (!user) return null

  const navItems = [
    {
      title: "Home",
      href: "/",
      icon: Home,
    },
    {
      title: "Dashboard",
      href: "/driver/dashboard",
      icon: Home,
    },
    {
      title: "My Vehicles",
      href: "/driver/vehicles",
      icon: Car,
    },
    {
      title: "Accident Reports",
      href: "/driver/accident-reports",
      icon: FileText,
    },
    {
      title: "Claims History",
      href: "/driver/claims-history",
      icon: Shield,
    },
    {
      title: "Claim Status",
      href: "/driver/claim-status",
      icon: FileText,
    },
    {
      title: "Initiate Claim",
      href: "/driver/initiate-claim",
      icon: FileText,
    },
    {
      title: "Driver Rating",
      href: "/driver/rating",
      icon: Star,
    },
    {
      title: "Premium Payment",
      href: "/driver/premium",
      icon: CreditCard,
    },
    {
      title: "Messages",
      href: "/driver/messages",
      icon: MessageSquare,
    },
    {
      title: "Settings",
      href: "/driver/settings",
      icon: Settings,
    },
  ]

  return (
    <div className={cn("w-64 bg-gray-900 text-white flex flex-col h-full", className)}>
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xl font-bold">Accident Reporting</h2>
        <p className="text-sm text-gray-400">Driver Portal</p>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                pathname === item.href ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white",
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-800">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
          onClick={logout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign out
        </Button>
      </div>
    </div>
  )
}

