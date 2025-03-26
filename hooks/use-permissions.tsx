"use client"

import { useAuth, type UserRole } from "@/lib/auth-context"

// Define permission types
export type Permission =
  | "manage_users"
  | "view_reports"
  | "create_reports"
  | "approve_reports"
  | "manage_claims"
  | "view_driver_history"
  | "upload_evidence"
  | "view_statistics"
  | "access_admin_portal"
  | "access_police_portal"
  | "access_insurance_portal"
  | "access_dvla_portal"
  | "access_nic_portal"
  | "access_driver_portal"
  | "manage_subrogation"

// Role-based permission mapping
const rolePermissions: Record<UserRole, Permission[]> = {
  admin: ["manage_users", "view_reports", "view_statistics", "access_admin_portal"],
  police: ["create_reports", "approve_reports", "view_reports", "upload_evidence", "access_police_portal"],
  insurance: ["view_reports", "manage_claims", "view_driver_history", "access_insurance_portal", "manage_subrogation"],
  dvla: ["view_driver_history", "upload_evidence", "view_reports", "access_dvla_portal"],
  nic: ["view_reports", "view_statistics", "access_nic_portal", "manage_subrogation"],
  driver: ["create_reports", "upload_evidence", "view_driver_history", "access_driver_portal"],
}

// All possible permissions for superusers
const allPermissions: Permission[] = [
  "manage_users",
  "view_reports",
  "create_reports",
  "approve_reports",
  "manage_claims",
  "view_driver_history",
  "upload_evidence",
  "view_statistics",
  "access_admin_portal",
  "access_police_portal",
  "access_insurance_portal",
  "access_dvla_portal",
  "access_nic_portal",
  "access_driver_portal",
  "manage_subrogation",
]

export function usePermissions() {
  const { user } = useAuth()

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false

    // Superusers have all permissions
    if (user.isSuperuser) {
      return true
    }

    // Regular users have role-based permissions
    return rolePermissions[user.role]?.includes(permission) || false
  }

  const getUserPermissions = (): Permission[] => {
    if (!user) return []

    // Superusers have all permissions
    if (user.isSuperuser) {
      return allPermissions
    }

    // Regular users have role-based permissions
    return rolePermissions[user.role] || []
  }

  return { hasPermission, getUserPermissions }
}

