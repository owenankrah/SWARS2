"use client"
import { cn } from "@/lib/utils"

interface AccidentMapProps {
  className?: string
}

export function AccidentMap({ className }: AccidentMapProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Map implementation would go here */}
      <div className="absolute inset-0 flex items-center justify-center bg-muted">
        <p className="text-muted-foreground">Interactive map showing recent accidents</p>
      </div>
    </div>
  )
}

