import { supabase } from "@/lib/supabase"
import type { InsuranceClaim } from "@/lib/demo-data"

export async function getInsuranceClaims() {
  const { data, error } = await supabase
    .from("insurance_claims")
    .select("*")
    .order("date_submitted", { ascending: false })

  if (error) {
    console.error("Error fetching insurance claims:", error)
    throw error
  }

  return data
}

export async function getInsuranceClaimById(id: string) {
  const { data, error } = await supabase.from("insurance_claims").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching insurance claim with ID ${id}:`, error)
    throw error
  }

  return data
}

export async function getClaimsByStatus(status: string) {
  const { data, error } = await supabase
    .from("insurance_claims")
    .select("*")
    .eq("status", status)
    .order("date_submitted", { ascending: false })

  if (error) {
    console.error(`Error fetching claims with status ${status}:`, error)
    throw error
  }

  return data
}

export async function getClaimsByAccidentId(accidentId: string) {
  const { data, error } = await supabase
    .from("insurance_claims")
    .select("*")
    .eq("accident_id", accidentId)
    .order("date_submitted", { ascending: false })

  if (error) {
    console.error(`Error fetching claims for accident ID ${accidentId}:`, error)
    throw error
  }

  return data
}

export async function createInsuranceClaim(claim: Omit<InsuranceClaim, "id"> & { id?: string }) {
  const { data, error } = await supabase.from("insurance_claims").insert([claim]).select()

  if (error) {
    console.error("Error creating insurance claim:", error)
    throw error
  }

  return data[0]
}

export async function updateInsuranceClaim(id: string, updates: Partial<InsuranceClaim>) {
  const { data, error } = await supabase.from("insurance_claims").update(updates).eq("id", id).select()

  if (error) {
    console.error(`Error updating insurance claim with ID ${id}:`, error)
    throw error
  }

  return data[0]
}

export async function deleteInsuranceClaim(id: string) {
  const { error } = await supabase.from("insurance_claims").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting insurance claim with ID ${id}:`, error)
    throw error
  }

  return true
}

export async function approveInsuranceClaim(id: string) {
  return updateInsuranceClaim(id, {
    status: "approved",
    date_processed: new Date().toISOString().split("T")[0],
  })
}

export async function rejectInsuranceClaim(id: string) {
  return updateInsuranceClaim(id, {
    status: "rejected",
    date_processed: new Date().toISOString().split("T")[0],
  })
}

export async function payInsuranceClaim(id: string) {
  return updateInsuranceClaim(id, {
    status: "paid",
    date_processed: new Date().toISOString().split("T")[0],
  })
}

