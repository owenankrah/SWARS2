"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { UserRole } from "@/lib/auth-context"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  organization?: string
  lastLogin?: Date
  passwordExpiry?: Date
  status: "active" | "inactive" | "locked" | "pending"
}

// Sample user data
const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@police.gov.gh",
    role: "police",
    organization: "Ghana Police Service",
    lastLogin: new Date(2023, 5, 15),
    passwordExpiry: new Date(2023, 11, 15),
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@dvla.gov.gh",
    role: "dvla",
    organization: "Driver and Vehicle Licensing Authority",
    lastLogin: new Date(2023, 6, 20),
    passwordExpiry: new Date(2023, 12, 20),
    status: "active",
  },
  {
    id: "3",
    name: "Kwame Mensah",
    email: "k.mensah@insurance.com",
    role: "insurance",
    organization: "Star Assurance",
    lastLogin: new Date(2023, 7, 5),
    passwordExpiry: new Date(2024, 1, 5),
    status: "active",
  },
  {
    id: "4",
    name: "Ama Owusu",
    email: "a.owusu@nic.gov.gh",
    role: "nic",
    organization: "National Insurance Commission",
    lastLogin: new Date(2023, 7, 10),
    passwordExpiry: new Date(2024, 1, 10),
    status: "active",
  },
  {
    id: "5",
    name: "Kofi Annan",
    email: "k.annan@driver.com",
    role: "driver",
    lastLogin: new Date(2023, 8, 1),
    passwordExpiry: new Date(2024, 2, 1),
    status: "active",
  },
  {
    id: "6",
    name: "Abena Poku",
    email: "a.poku@admin.com",
    role: "admin",
    organization: "System Administration",
    lastLogin: new Date(2023, 8, 15),
    passwordExpiry: new Date(2024, 2, 15),
    status: "active",
  },
  {
    id: "7",
    name: "Yaw Mensa",
    email: "y.mensa@police.gov.gh",
    role: "police",
    organization: "Ghana Police Service",
    status: "pending",
  },
  {
    id: "8",
    name: "Akua Sarpong",
    email: "a.sarpong@insurance.com",
    role: "insurance",
    organization: "Enterprise Insurance",
    lastLogin: new Date(2023, 6, 1),
    passwordExpiry: new Date(2023, 12, 1),
    status: "locked",
  },
]

export function UserManagementTable() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  const getRoleBadgeColor = (role: UserRole) => {
    const colors = {
      admin: "bg-purple-100 text-purple-800",
      police: "bg-blue-100 text-blue-800",
      insurance: "bg-green-100 text-green-800",
      dvla: "bg-yellow-100 text-yellow-800",
      nic: "bg-orange-100 text-orange-800",
      driver: "bg-gray-100 text-gray-800",
    }
    return colors[role] || "bg-gray-100 text-gray-800"
  }

  const getStatusBadgeColor = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      locked: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const handleViewUser = (user: User) => {
    if (!isMounted.current) return
    setSelectedUser(user)
    setIsViewDialogOpen(true)
  }

  const formatDate = (date?: Date) => {
    if (!date) return "N/A"
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge className={getRoleBadgeColor(user.role)} variant="outline">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>{user.organization || "N/A"}</TableCell>
              <TableCell>
                <Badge className={getStatusBadgeColor(user.status)} variant="outline">
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(user.lastLogin)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleViewUser(user)}>
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog
        open={isViewDialogOpen}
        onOpenChange={(open) => {
          if (isMounted.current) {
            setIsViewDialogOpen(open)
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>Detailed information about the selected user.</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Name</h4>
                  <p>{selectedUser.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Email</h4>
                  <p>{selectedUser.email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Role</h4>
                  <Badge className={getRoleBadgeColor(selectedUser.role)} variant="outline">
                    {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Organization</h4>
                  <p>{selectedUser.organization || "N/A"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Status</h4>
                  <Badge className={getStatusBadgeColor(selectedUser.status)} variant="outline">
                    {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Last Login</h4>
                  <p>{formatDate(selectedUser.lastLogin)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Password Expiry</h4>
                  <p>{formatDate(selectedUser.passwordExpiry)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">User ID</h4>
                  <p>{selectedUser.id}</p>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (isMounted.current) {
                      setIsViewDialogOpen(false)
                    }
                  }}
                >
                  Close
                </Button>
                <Button>Reset Password</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

