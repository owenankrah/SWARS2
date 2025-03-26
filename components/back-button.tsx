"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface BackButtonProps {
  href?: string
  label?: string
}

/**
 * Back Button Component
 *
 * This component provides a consistent way to navigate back in the application.
 * It can either go to a specific URL or use the browser's history.
 */
export function BackButton({ href, label = "Back" }: BackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (href) {
      router.push(href)
    } else {
      router.back()
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleClick} className="gap-1">
      <ChevronLeft className="h-4 w-4" />
      {label}
    </Button>
  )
}

