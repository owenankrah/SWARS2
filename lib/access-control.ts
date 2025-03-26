"use client"

/**
 * Access Control System
 *
 * This module implements a role-based access control (RBAC) system for the application.
 * It defines permissions for different user roles and provides functions to check
 * if a user has permission to perform specific actions.
 *
 * The system is designed to be configurable but is disabled by default.
 * To enable it, set the ENABLE_RBAC environment variable to "true".
 *
 * @module access-control
 *
 * @backend
 * Required database schema:
 * - roles: Defines user roles (police, dvla, insurance, nic, driver, admin)
 * - permissions: Defines available permissions in the system
 * - role_permissions: Maps roles to permissions
 * - user_roles: Maps users to roles (allows multiple roles per user)
 */

// User roles in the system
export type UserRole = "police" | "dvla" | "insurance" | "nic" | "driver" | "admin"

// Permission types
export type ResourceType = "accident_report" | "evidence" | "claim" | "user" | "vehicle" | "driver" | "system"

export type ActionType = "create" | "read" | "update" | "delete" | "approve" | "generate" | "upload"

export type Permission = `${ActionType}:${ResourceType}`

// Define permissions for each role
const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    "create:user",
    "read:user",
    "update:user",
    "delete:user",
    "read:accident_report",
    "read:evidence",
    "read:claim",
    "read:vehicle",
    "read:driver",
    "read:system",
    "update:system",
  ],
  police: [
    "create:accident_report",
    "read:accident_report",
    "update:accident_report",
    "approve:accident_report",
    "generate:accident_report",
    "read:evidence",
    "upload:evidence",
    "read:vehicle",
    "read:driver",
  ],
  dvla: [
    "read:accident_report",
    "update:accident_report",
    "read:evidence",
    "upload:evidence",
    "read:vehicle",
    "update:vehicle",
  ],
  insurance: [
    "read:accident_report",
    "read:evidence",
    "create:claim",
    "read:claim",
    "update:claim",
    "read:vehicle",
    "read:driver",
  ],
  nic: ["read:accident_report", "read:evidence", "read:claim", "generate:accident_report"],
  driver: ["read:accident_report", "read:evidence", "create:claim", "read:claim", "read:vehicle"],
}

/**
 * Check if RBAC is enabled
 *
 * @returns {boolean} True if RBAC is enabled, false otherwise
 */
export function isRbacEnabled(): boolean {
  // This would check an environment variable or configuration setting
  // For now, it's disabled by default
  return process.env.ENABLE_RBAC === "false"
}

/**
 * Check if a user has a specific permission
 *
 * @param {UserRole} role - The user's role
 * @param {Permission} permission - The permission to check
 * @returns {boolean} True if the user has the permission, false otherwise
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  if (!isRbacEnabled()) {
    // If RBAC is disabled, allow all actions (rely on UI hiding)
    return true
  }

  return rolePermissions[role]?.includes(permission) || false
}

/**
 * Check if a user has any of the specified permissions
 *
 * @param {UserRole} role - The user's role
 * @param {Permission[]} permissions - The permissions to check
 * @returns {boolean} True if the user has any of the permissions, false otherwise
 */
export function hasAnyPermission(role: UserRole, permissions: Permission[]): boolean {
  if (!isRbacEnabled()) {
    // If RBAC is disabled, allow all actions (rely on UI hiding)
    return true
  }

  return permissions.some((permission) => hasPermission(role, permission))
}

/**
 * Get all permissions for a role
 *
 * @param {UserRole} role - The user's role
 * @returns {Permission[]} Array of permissions for the role
 */
export function getPermissionsForRole(role: UserRole): Permission[] {
  return rolePermissions[role] || []
}

/**
 * To enable the RBAC system:
 *
 * 1. Set the ENABLE_RBAC environment variable to "true"
 * 2. Use the hasPermission and hasAnyPermission functions to check permissions
 * 3. Implement the backend database schema for roles and permissions
 * 4. Update the rolePermissions object as needed for your application
 *
 * Example usage:
 *
 * ```tsx
 * import { hasPermission } from '@/lib/access-control'
 *
 * function MyComponent() {
 *   const { user } = useAuth()
 *
 *   if (user && hasPermission(user.role, 'create:accident_report')) {
 *     return <Button>Create Report</Button>
 *   }
 *
 *   return null
 * }
 * ```
 */

