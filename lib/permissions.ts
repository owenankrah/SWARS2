// Add a check for superuser in the permissions system

/**
 * Check if a user has a specific permission
 */
export function hasPermission(user: User | null, permission: Permission): boolean {
  if (!user) return false

  // Superuser has all permissions
  if (user.isSuperuser) return true

  return rolePermissions[user.role]?.includes(permission) || false
}

