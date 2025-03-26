export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: string
          organization: string | null
          is_superuser: boolean
          created_at: string
          updated_at: string
          password_expiry: string | null
          last_login: string | null
        }
        Insert: {
          id?: string
          email: string
          name: string
          role: string
          organization?: string | null
          is_superuser?: boolean
          created_at?: string
          updated_at?: string
          password_expiry?: string | null
          last_login?: string | null
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: string
          organization?: string | null
          is_superuser?: boolean
          created_at?: string
          updated_at?: string
          password_expiry?: string | null
          last_login?: string | null
        }
      }
      accident_reports: {
        Row: {
          id: string
          date: string
          location: string
          description: string
          severity: string
          vehicles: string[]
          drivers: string[]
          status: string
          reporting_officer: string
          evidence_ids: string[] | null
          created_at: string
          updated_at: string
          weather_conditions: string | null
          road_conditions: string | null
          light_conditions: string | null
          injuries: number | null
          fatalities: number | null
          witnesses: string | null
        }
        Insert: {
          id?: string
          date: string
          location: string
          description: string
          severity: string
          vehicles: string[]
          drivers: string[]
          status: string
          reporting_officer: string
          evidence_ids?: string[] | null
          created_at?: string
          updated_at?: string
          weather_conditions?: string | null
          road_conditions?: string | null
          light_conditions?: string | null
          injuries?: number | null
          fatalities?: number | null
          witnesses?: string | null
        }
        Update: {
          id?: string
          date?: string
          location?: string
          description?: string
          severity?: string
          vehicles?: string[]
          drivers?: string[]
          status?: string
          reporting_officer?: string
          evidence_ids?: string[] | null
          created_at?: string
          updated_at?: string
          weather_conditions?: string | null
          road_conditions?: string | null
          light_conditions?: string | null
          injuries?: number | null
          fatalities?: number | null
          witnesses?: string | null
        }
      }
      insurance_claims: {
        Row: {
          id: string
          accident_id: string
          policy_number: string
          claimant: string
          claimant_contact: string
          vehicle_reg: string
          date_submitted: string
          date_processed: string | null
          amount: number
          status: string
          description: string
          handling_agent: string
          documents: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          accident_id: string
          policy_number: string
          claimant: string
          claimant_contact: string
          vehicle_reg: string
          date_submitted: string
          date_processed?: string | null
          amount: number
          status: string
          description: string
          handling_agent: string
          documents: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          accident_id?: string
          policy_number?: string
          claimant?: string
          claimant_contact?: string
          vehicle_reg?: string
          date_submitted?: string
          date_processed?: string | null
          amount?: number
          status?: string
          description?: string
          handling_agent?: string
          documents?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      subrogation_claims: {
        Row: {
          id: string
          accident_id: string
          claim_id: string
          claiming_company: string
          responding_company: string
          amount: number
          date_submitted: string
          date_resolved: string | null
          status: string
          description: string
          evidence_ids: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          accident_id: string
          claim_id: string
          claiming_company: string
          responding_company: string
          amount: number
          date_submitted: string
          date_resolved?: string | null
          status: string
          description: string
          evidence_ids: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          accident_id?: string
          claim_id?: string
          claiming_company?: string
          responding_company?: string
          amount?: number
          date_submitted?: string
          date_resolved?: string | null
          status?: string
          description?: string
          evidence_ids?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      insurance_companies: {
        Row: {
          id: string
          name: string
          code: string
          address: string
          contact_phone: string
          contact_email: string
          total_policies: number
          total_claims: number
          pending_claims: number
          pending_subrogations: number
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          code: string
          address: string
          contact_phone: string
          contact_email: string
          total_policies: number
          total_claims: number
          pending_claims: number
          pending_subrogations: number
          status: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          code?: string
          address?: string
          contact_phone?: string
          contact_email?: string
          total_policies?: number
          total_claims?: number
          pending_claims?: number
          pending_subrogations?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      evidence: {
        Row: {
          id: string
          accident_id: string
          file_path: string
          file_type: string
          uploaded_by: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          accident_id: string
          file_path: string
          file_type: string
          uploaded_by: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          accident_id?: string
          file_path?: string
          file_type?: string
          uploaded_by?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

