"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { DriverSidebar } from "@/components/driver-sidebar"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Loader2 } from "lucide-react"

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If not loading and not authenticated, redirect to login
    if (!isLoading && !isAuthenticated) {
      console.log("Not authenticated, redirecting to login")
      router.push("/login")
    }

    // If authenticated but not as driver or superuser, redirect to home
    if (!isLoading && isAuthenticated && user?.role !== "driver" && !user?.isSuperuser) {
      router.push("/")
    }
  }, [isLoading, isAuthenticated, user, router])

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // If not authenticated, don't render anything (will redirect)
  if (!isAuthenticated || !user) {
    return null
  }

  // If authenticated but not as driver or superuser, don't render driver layout
  if (user.role !== "driver" && !user.isSuperuser) {
    return null
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden md:block">
        <DriverSidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="flex h-16 items-center justify-between px-4 md:px-6">
            <MainNav />
            <div className="flex items-center gap-4">
              <ModeToggle />
              <UserNav />
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

