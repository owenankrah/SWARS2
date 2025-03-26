import { supabase } from "@/lib/supabase"
import type { SubrogationClaim } from "@/lib/demo-data"

export async function getSubrogationClaims() {
  const { data, error } = await supabase
    .from("subrogation_claims")
    .select("*")
    .order("date_submitted", { ascending: false })

  if (error) {
    console.error("Error fetching subrogation claims:", error)
    throw error
  }

  return data
}

export async function getSubrogationClaimById(id: string) {
  const { data, error } = await supabase.from("subrogation_claims").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching subrogation claim with ID ${id}:`, error)
    throw error
  }

  return data
}

export async function getSubrogationClaimsByStatus(status: string) {
  const { data, error } = await supabase
    .from("subrogation_claims")
    .select("*")
    .eq("status", status)
    .order("date_submitted", { ascending: false })

  if (error) {
    console.error(`Error fetching subrogation claims with status ${status}:`, error)
    throw error
  }

  return data
}

export async function getSubrogationClaimsByAccidentId(accidentId: string) {
  const { data, error } = await supabase
    .from("subrogation_claims")
    .select("*")
    .eq("accident_id", accidentId)
    .order("date_submitted", { ascending: false })

  if (error) {
    console.error(`Error fetching subrogation claims for accident ID ${accidentId}:`, error)
    throw error
  }

  return data
}

export async function createSubrogationClaim(claim: Omit<SubrogationClaim, "id"> & { id?: string }) {
  const { data, error } = await supabase.from("subrogation_claims").insert([claim]).select()

  if (error) {
    console.error("Error creating subrogation claim:", error)
    throw error
  }

  return data[0]
}

export async function updateSubrogationClaim(id: string, updates: Partial<SubrogationClaim>) {
  const { data, error } = await supabase.from("subrogation_claims").update(updates).eq("id", id).select()

  if (error) {
    console.error(`Error updating subrogation claim with ID ${id}:`, error)
    throw error
  }

  return data[0]
}

export async function deleteSubrogationClaim(id: string) {
  const { error } = await supabase.from("subrogation_claims").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting subrogation claim with ID ${id}:`, error)
    throw error
  }

  return true
}

export async function acceptSubrogationClaim(id: string) {
  return updateSubrogationClaim(id, { status: "accepted" })
}

export async function disputeSubrogationClaim(id: string) {
  return updateSubrogationClaim(id, { status: "disputed" })
}

export async function resolveSubrogationClaim(id: string) {
  return updateSubrogationClaim(id, {
    status: "resolved",
    date_resolved: new Date().toISOString().split("T")[0],
  })
}

export async function withdrawSubrogationClaim(id: string) {
  return updateSubrogationClaim(id, { status: "withdrawn" })
}

