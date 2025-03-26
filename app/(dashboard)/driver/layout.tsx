import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Driver Dashboard | Single Window Accident Reporting",
  description: "Driver dashboard for the Single Window Accident Reporting System",
}

interface DriverLayoutProps {
  children: React.ReactNode
}

export default function DriverLayout({ children }: DriverLayoutProps) {
  return <div className="flex flex-col space-y-6">{children}</div>
}

