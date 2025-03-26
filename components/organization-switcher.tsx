"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Car, FileText, BadgeIcon as Police, Shield } from "lucide-react"
import { useState } from "react"

type Organization = {
  id: string
  name: string
  icon: React.ReactNode
  color: string
}

const organizations: Organization[] = [
  {
    id: "police",
    name: "Ghana Police Service",
    icon: <Police className="h-4 w-4" />,
    color: "text-blue-600",
  },
  {
    id: "dvla",
    name: "DVLA",
    icon: <Car className="h-4 w-4" />,
    color: "text-green-600",
  },
  {
    id: "insurance",
    name: "Insurance Companies",
    icon: <Shield className="h-4 w-4" />,
    color: "text-purple-600",
  },
  {
    id: "nic",
    name: "NIC",
    icon: <FileText className="h-4 w-4" />,
    color: "text-orange-600",
  },
]

interface OrganizationSwitcherProps {
  className?: string
}

export function OrganizationSwitcher({ className }: OrganizationSwitcherProps) {
  const [selected, setSelected] = useState<Organization>(organizations[0])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={cn("w-[200px] justify-start gap-2", className)}>
          <span className={selected.color}>{selected.icon}</span>
          {selected.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px]">
        {organizations.map((org) => (
          <DropdownMenuItem key={org.id} onClick={() => setSelected(org)} className="gap-2">
            <span className={org.color}>{org.icon}</span>
            {org.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

