import { supabase } from "@/lib/supabase"

export interface Evidence {
  id: string
  accident_id: string
  file_path: string
  file_type: string
  uploaded_by: string
  description?: string
  created_at?: string
  updated_at?: string
}

export async function getEvidence() {
  const { data, error } = await supabase.from("evidence").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching evidence:", error)
    throw error
  }

  return data
}

export async function getEvidenceById(id: string) {
  const { data, error } = await supabase.from("evidence").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching evidence with ID ${id}:`, error)
    throw error
  }

  return data
}

export async function getEvidenceByAccidentId(accidentId: string) {
  const { data, error } = await supabase
    .from("evidence")
    .select("*")
    .eq("accident_id", accidentId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error(`Error fetching evidence for accident ID ${accidentId}:`, error)
    throw error
  }

  return data
}

export async function createEvidence(evidence: Omit<Evidence, "id" | "created_at" | "updated_at"> & { id?: string }) {
  const { data, error } = await supabase.from("evidence").insert([evidence]).select()

  if (error) {
    console.error("Error creating evidence:", error)
    throw error
  }

  return data[0]
}

export async function updateEvidence(id: string, updates: Partial<Evidence>) {
  const { data, error } = await supabase.from("evidence").update(updates).eq("id", id).select()

  if (error) {
    console.error(`Error updating evidence with ID ${id}:`, error)
    throw error
  }

  return data[0]
}

export async function deleteEvidence(id: string) {
  const { error } = await supabase.from("evidence").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting evidence with ID ${id}:`, error)
    throw error
  }

  return true
}

// Function to upload a file to Supabase Storage
export async function uploadEvidenceFile(file: File, path: string) {
  const { data, error } = await supabase.storage.from("evidence").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  })

  if (error) {
    console.error("Error uploading file:", error)
    throw error
  }

  return data
}

// Function to get a public URL for a file
export function getEvidenceFileUrl(path: string) {
  const { data } = supabase.storage.from("evidence").getPublicUrl(path)

  return data.publicUrl
}

// Function to delete a file from storage
export async function deleteEvidenceFile(path: string) {
  const { error } = await supabase.storage.from("evidence").remove([path])

  if (error) {
    console.error(`Error deleting file at path ${path}:`, error)
    throw error
  }

  return true
}

