import { supabase } from "@/lib/supabase"
import type { InsuranceCompany } from "@/lib/demo-data"

export async function getInsuranceCompanies() {
  const { data, error } = await supabase.from("insurance_companies").select("*").order("name", { ascending: true })

  if (error) {
    console.error("Error fetching insurance companies:", error)
    throw error
  }

  return data
}

export async function getInsuranceCompanyById(id: string) {
  const { data, error } = await supabase.from("insurance_companies").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching insurance company with ID ${id}:`, error)
    throw error
  }

  return data
}

export async function getActiveInsuranceCompanies() {
  const { data, error } = await supabase
    .from("insurance_companies")
    .select("*")
    .eq("status", "active")
    .order("name", { ascending: true })

  if (error) {
    console.error("Error fetching active insurance companies:", error)
    throw error
  }

  return data
}

export async function createInsuranceCompany(company: Omit<InsuranceCompany, "id"> & { id?: string }) {
  const { data, error } = await supabase.from("insurance_companies").insert([company]).select()

  if (error) {
    console.error("Error creating insurance company:", error)
    throw error
  }

  return data[0]
}

export async function updateInsuranceCompany(id: string, updates: Partial<InsuranceCompany>) {
  const { data, error } = await supabase.from("insurance_companies").update(updates).eq("id", id).select()

  if (error) {
    console.error(`Error updating insurance company with ID ${id}:`, error)
    throw error
  }

  return data[0]
}

export async function deleteInsuranceCompany(id: string) {
  const { error } = await supabase.from("insurance_companies").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting insurance company with ID ${id}:`, error)
    throw error
  }

  return true
}

export async function suspendInsuranceCompany(id: string) {
  return updateInsuranceCompany(id, { status: "suspended" })
}

export async function activateInsuranceCompany(id: string) {
  return updateInsuranceCompany(id, { status: "active" })
}

export async function deactivateInsuranceCompany(id: string) {
  return updateInsuranceCompany(id, { status: "inactive" })
}

