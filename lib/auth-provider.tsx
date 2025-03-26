"use client"

import type React from "react"

import { createContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

// Define user types
export type UserRole = "admin" | "police" | "dvla" | "insurance" | "nic" | "driver"

export interface User {
  id: string
  name?: string
  email: string
  role: UserRole
  image?: string
}

// Define auth context type
interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

// Create auth context
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
})

// Demo users for testing
const demoUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
  {
    id: "2",
    name: "Police Officer",
    email: "police@example.com",
    role: "police",
  },
  {
    id: "3",
    name: "DVLA Officer",
    email: "dvla@example.com",
    role: "dvla",
  },
  {
    id: "4",
    name: "Insurance Agent",
    email: "insurance@example.com",
    role: "insurance",
  },
  {
    id: "5",
    name: "NIC Officer",
    email: "nic@example.com",
    role: "nic",
  },
  {
    id: "6",
    name: "Driver",
    email: "driver@example.com",
    role: "driver",
  },
]

// Check if email is superuser
const isSuperuser = (email: string) => {
  const superuserEmail = process.env.NEXT_PUBLIC_SUPERUSER_EMAIL
  return superuserEmail && email.toLowerCase() === superuserEmail.toLowerCase()
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (error) {
          console.error("Failed to parse stored user:", error)
          localStorage.removeItem("user")
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)

      // For demo purposes, we'll use the demo users
      const normalizedEmail = email.toLowerCase()

      // Check if it's the superuser
      if (isSuperuser(normalizedEmail)) {
        // Superuser can log in with "badbadbad" or "Superuser" password
        if (password === "badbadbad" || password === "Superuser") {
          const superuser: User = {
            id: "0",
            name: "Super Admin",
            email: normalizedEmail,
            role: "admin",
          }

          setUser(superuser)
          localStorage.setItem("user", JSON.stringify(superuser))

          toast({
            title: "Logged in as Superuser",
            description: "Welcome, Super Admin!",
          })

          router.push("/admin/dashboard")
          return
        }
      }

      // For demo accounts, any password works
      const foundUser = demoUsers.find((u) => u.email.toLowerCase() === normalizedEmail)

      if (foundUser) {
        setUser(foundUser)
        localStorage.setItem("user", JSON.stringify(foundUser))

        toast({
          title: "Logged in successfully",
          description: `Welcome, ${foundUser.name || foundUser.email}!`,
        })

        router.push(`/${foundUser.role}/dashboard`)
        return
      }

      // If we get here, login failed
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password",
      })
    } catch (error) {
      console.error("Login error:", error)
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An error occurred during login",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = async () => {
    setUser(null)
    localStorage.removeItem("user")
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

