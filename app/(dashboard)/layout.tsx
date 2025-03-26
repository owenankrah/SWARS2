import type React from "react"
import type { Metadata } from "next"
import { Sidebar } from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-context"

export const metadata: Metadata = {
  title: "Single Window Accident Reporting",
  description: "A unified system for accident reporting in Ghana",
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="flex min-h-screen flex-col">
          <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
            <Sidebar className="hidden md:block" />
            <main className="flex w-full flex-col overflow-hidden">{children}</main>
          </div>
        </div>
      </ThemeProvider>
    </AuthProvider>
  )
}

