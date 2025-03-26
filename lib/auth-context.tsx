"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { getUserByEmail, updateLastLogin } from "@/services/user-service"

// Define user roles and permissions
export type UserRole = "admin" | "police" | "insurance" | "dvla" | "nic" | "driver"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  organization?: string
  isSuperuser?: boolean
  passwordExpiry?: Date
  lastLogin?: Date
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session) {
          // Get user details from our users table
          const email = session.user.email
          if (email) {
            const userData = await getUserByEmail(email)

            if (userData) {
              const user: User = {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                role: userData.role as UserRole,
                organization: userData.organization || undefined,
                isSuperuser: userData.is_superuser,
                passwordExpiry: userData.password_expiry ? new Date(userData.password_expiry) : undefined,
                lastLogin: userData.last_login ? new Date(userData.last_login) : undefined,
              }

              setUser(user)

              // Update last login time
              await updateLastLogin(user.id)
            }
          }
        }
      } catch (error) {
        console.error("Error checking session:", error)
      } finally {
        setIsLoading(false)
        setIsInitialized(true)
      }
    }

    checkSession()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log("Login function called with:", email)
    setIsLoading(true)

    try {
      // Check for superuser credentials
      const superuserEmail = process.env.NEXT_PUBLIC_SUPERUSER_EMAIL || "owen.ankrah@outlook.com"

      // For demo purposes, we'll still allow the special superuser login
      if (
        email.toLowerCase() === superuserEmail.toLowerCase() &&
        (password === "Superuser" || password === "badbadbad")
      ) {
        // Sign in with Supabase Auth
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password: "badbadbad", // Use a consistent password for the superuser
        })

        if (error) {
          // If the user doesn't exist in Auth, create them
          if (error.message.includes("Invalid login credentials")) {
            const { error: signUpError } = await supabase.auth.signUp({
              email,
              password: "badbadbad",
            })

            if (signUpError) {
              throw signUpError
            }
          } else {
            throw error
          }
        }

        // Check if the user exists in our users table
        let userData
        try {
          userData = await getUserByEmail(email)
        } catch (e) {
          // User doesn't exist in our table, we'll create them
          userData = null
        }

        if (!userData) {
          // Create the superuser in our users table
          const {
            data: { user: authUser },
          } = await supabase.auth.getUser()

          if (!authUser) {
            throw new Error("Failed to get authenticated user")
          }

          // Create user in our users table
          const newUser = {
            id: authUser.id,
            name: "System Superuser",
            email: email,
            role: "admin" as UserRole,
            organization: "System Administration",
            isSuperuser: true,
            lastLogin: new Date(),
          }

          // Use the Supabase client directly to insert the user
          const { error: insertError } = await supabase.from("users").insert([
            {
              id: newUser.id,
              name: newUser.name,
              email: newUser.email,
              role: newUser.role,
              organization: newUser.organization,
              is_superuser: newUser.isSuperuser,
              last_login: newUser.lastLogin?.toISOString(),
            },
          ])

          if (insertError) {
            throw insertError
          }

          userData = newUser
        }

        // Convert to our User type
        const user: User = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role as UserRole,
          organization: userData.organization || undefined,
          isSuperuser: userData.is_superuser || userData.isSuperuser,
          passwordExpiry: userData.password_expiry ? new Date(userData.password_expiry) : undefined,
          lastLogin: new Date(),
        }

        setUser(user)

        // Update last login time
        await updateLastLogin(user.id)

        toast({
          title: "Welcome, Superuser",
          description: "You have access to all portals in the system",
        })

        setIsLoading(false)
        return true
      }

      // Regular user authentication
      // For demo purposes, we'll accept any password for mock users
      try {
        // Try to get the user from our database first
        const userData = await getUserByEmail(email)

        if (userData) {
          // Sign in with Supabase Auth
          const { error } = await supabase.auth.signInWithPassword({
            email,
            password: "demo-password", // Use a consistent password for demo accounts
          })

          if (error) {
            // If the user doesn't exist in Auth, create them
            if (error.message.includes("Invalid login credentials")) {
              const { error: signUpError } = await supabase.auth.signUp({
                email,
                password: "demo-password",
              })

              if (signUpError) {
                throw signUpError
              }
            } else {
              throw error
            }
          }

          // Convert to our User type
          const user: User = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role as UserRole,
            organization: userData.organization || undefined,
            isSuperuser: userData.is_superuser,
            passwordExpiry: userData.password_expiry ? new Date(userData.password_expiry) : undefined,
            lastLogin: new Date(),
          }

          setUser(user)

          // Update last login time
          await updateLastLogin(user.id)

          toast({
            title: `Welcome, ${userData.name}`,
            description: `Logged in as ${userData.role}`,
          })

          setIsLoading(false)
          return true
        } else {
          // User not found in our database
          toast({
            variant: "destructive",
            title: "Login failed",
            description: "User not found",
          })

          setIsLoading(false)
          return false
        }
      } catch (error) {
        console.error("Error during login:", error)
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password",
        })

        setIsLoading(false)
        return false
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        variant: "destructive",
        title: "Login error",
        description: "An unexpected error occurred",
      })

      setIsLoading(false)
      return false
    }
  }

  const logout = async () => {
    console.log("Logging out user")

    // Sign out from Supabase Auth
    await supabase.auth.signOut()

    setUser(null)

    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    })

    router.push("/login")
  }

  const value = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user,
  }

  // Only render children once we've checked for a stored user
  return <AuthContext.Provider value={value}>{isInitialized ? children : <div>Loading...</div>}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

