import { supabase } from "@/lib/supabase"
import type { AccidentReport } from "@/lib/demo-data"

export async function getAccidentReports() {
  const { data, error } = await supabase.from("accident_reports").select("*").order("date", { ascending: false })

  if (error) {
    console.error("Error fetching accident reports:", error)
    throw error
  }

  return data
}

export async function getAccidentReportById(id: string) {
  const { data, error } = await supabase.from("accident_reports").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching accident report with ID ${id}:`, error)
    throw error
  }

  return data
}

export async function getPendingAccidentReports() {
  const { data, error } = await supabase
    .from("accident_reports")
    .select("*")
    .eq("status", "pending")
    .order("date", { ascending: false })

  if (error) {
    console.error("Error fetching pending accident reports:", error)
    throw error
  }

  return data
}

export async function getApprovedAccidentReports() {
  const { data, error } = await supabase
    .from("accident_reports")
    .select("*")
    .eq("status", "approved")
    .order("date", { ascending: false })

  if (error) {
    console.error("Error fetching approved accident reports:", error)
    throw error
  }

  return data
}

export async function createAccidentReport(report: Omit<AccidentReport, "id"> & { id?: string }) {
  const { data, error } = await supabase.from("accident_reports").insert([report]).select()

  if (error) {
    console.error("Error creating accident report:", error)
    throw error
  }

  return data[0]
}

export async function updateAccidentReport(id: string, updates: Partial<AccidentReport>) {
  const { data, error } = await supabase.from("accident_reports").update(updates).eq("id", id).select()

  if (error) {
    console.error(`Error updating accident report with ID ${id}:`, error)
    throw error
  }

  return data[0]
}

export async function deleteAccidentReport(id: string) {
  const { error } = await supabase.from("accident_reports").delete().eq("id", id)

  if (error) {
    console.error(`Error deleting accident report with ID ${id}:`, error)
    throw error
  }

  return true
}

export async function approveAccidentReport(id: string) {
  return updateAccidentReport(id, { status: "approved" })
}

export async function rejectAccidentReport(id: string) {
  return updateAccidentReport(id, { status: "rejected" })
}

