import { supabase } from "@/lib/supabase"
import type { User } from "@/lib/auth-context"

export async function getUsers() {
  const { data, error } = await supabase.from("users").select("*").order("name", { ascending: true })

  if (error) {
    console.error("Error fetching users:", error)
    throw error
  }

  return data
}

export async function getUserById(id: string) {
  const { data, error } = await supabase.from("users").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching user with ID ${id}:`, error)
    throw error
  }

  return data
}

export async function getUserByEmail(email: string) {
  const { data, error } = await supabase.from("users").select("*").eq("email", email).single()

  if (error) {
    console.error(`Error fetching user with email ${email}:`, error)
    throw error
  }

  return data
}

export async function createUser(user: Omit<User, "id"> & { id?: string }) {
  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        ...user,
        is_superuser: user.isSuperuser || false,
        password_expiry: user.passwordExpiry?.toISOString(),
        last_login: user.lastLogin?.toISOString(),
      },
    ])
    .select()

  if (error) {
    console.error("Error creating user:", error)
    throw error
  }

  return data[0]
}

export async function updateUser(id: string, updates: Partial<User>) {
  const updateData: any = { ...updates }

  if (updates.isSuperuser !== undefined) {
    updateData.is_superuser = updates.isSuperuser
    delete updateData.isSuperuser
  }

  if (updates.passwordExpiry !== undefined) {
    updateData.password_expiry = updates.passwordExpiry?.toISOString()
    delete updateData.passwordExpiry
  }

  if (updates.lastLogin !== undefined) {
    updateData.last_login = updates.lastLogin?.toISOString()
    delete updateData.lastLogin
  }

  const { data, error } = await supabase.from("users").update(updateData).eq("id", id).select()

  if (error) {
    console.error(`Error updating user with ID ${id}:`, error)
    throw error
  }

  return data[0]
}

export async function deleteUser(id: string) {
  const { error } = await supabase.from("users").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting user with ID ${id}:`, error)
    throw error
  }

  return true
}

export async function updateLastLogin(id: string) {
  return updateUser(id, { lastLogin: new Date() })
}

