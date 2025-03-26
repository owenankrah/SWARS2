"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardRedirect() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login")
      } else {
        switch (user.role) {
          case "driver":
            router.push("/driver/dashboard")
            break
          case "police":
            router.push("/police/dashboard")
            break
          case "dvla":
            router.push("/dvla/dashboard")
            break
          case "insurance":
            router.push("/insurance/dashboard")
            break
          case "nic":
            router.push("/nic/dashboard")
            break
          default:
            router.push("/")
        }
      }
    }
  }, [user, loading, router])

  return (
    <div className="container flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Redirecting...</h1>
        <p className="text-muted-foreground">Please wait while we redirect you to your dashboard.</p>
      </div>
    </div>
  )
}

