"use client"

import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

interface DashboardHeaderProps {
  title: string
  user?: {
    name?: string
    role?: string
  }
}

export function DashboardHeader({ title, user }: DashboardHeaderProps) {
  const { logout } = useAuth()

  return (
    <div className="border-b">
      <div className="flex h-16 items-center justify-between px-4">
        <h1 className="text-lg font-semibold">{title}</h1>

        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            {user?.name && <span>{user.name}</span>}
            {user?.role && <span className="ml-2 text-xs uppercase">{user.role}</span>}
          </div>

          <Button variant="ghost" size="icon" onClick={logout}>
            <User className="h-5 w-5" />
            <span className="sr-only">User menu</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

