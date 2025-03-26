/**
 * Admin User Management Page
 *
 * This component provides a comprehensive interface for administrators to:
 * - View all system users
 * - Create new user accounts (individually or via CSV upload)
 * - Edit existing user accounts
 * - Manage user roles and permissions
 * - Reset passwords and enforce password policies
 *
 * @component
 * @returns {JSX.Element} The user management UI
 *
 * @backend
 * Required API endpoints:
 * - GET /api/admin/users - Fetch all users with pagination
 * - POST /api/admin/users - Create a new user
 * - POST /api/admin/users/bulk - Bulk create users from CSV
 * - PUT /api/admin/users/:id - Update a user
 * - DELETE /api/admin/users/:id - Delete a user
 * - POST /api/admin/users/:id/reset-password - Reset a user's password
 */
"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Edit, MoreHorizontal, Search, Trash, Upload, UserPlus } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"

// Mock user data
const mockUsers = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john.doe@police.gov.gh",
    role: "police",
    organization: "Ghana Police Service",
    status: "active",
    lastLogin: "2023-06-20T10:30:00Z",
    passwordExpiry: "2023-09-18T00:00:00Z",
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane.smith@dvla.gov.gh",
    role: "dvla",
    organization: "DVLA",
    status: "active",
    lastLogin: "2023-06-19T14:45:00Z",
    passwordExpiry: "2023-09-15T00:00:00Z",
  },
  {
    id: "user-3",
    name: "Michael Johnson",
    email: "michael@insurance.com",
    role: "insurance",
    organization: "Insurance Company",
    status: "inactive",
    lastLogin: "2023-06-10T09:15:00Z",
    passwordExpiry: "2023-09-10T00:00:00Z",
  },
  {
    id: "user-4",
    name: "Sarah Williams",
    email: "sarah@nic.gov.gh",
    role: "nic",
    organization: "NIC",
    status: "active",
    lastLogin: "2023-06-18T16:20:00Z",
    passwordExpiry: "2023-09-12T00:00:00Z",
  },
  {
    id: "user-5",
    name: "Robert Brown",
    email: "robert@police.gov.gh",
    role: "police",
    organization: "Ghana Police Service",
    status: "active",
    lastLogin: "2023-06-17T11:10:00Z",
    passwordExpiry: "2023-09-05T00:00:00Z",
  },
]

/**
 * Password policy based on ISO/IEC 27001 and 27002 standards
 *
 * @backend
 * This policy should be implemented on the backend for all password validations:
 * - Minimum length: 12 characters
 * - Must contain at least one uppercase letter
 * - Must contain at least one lowercase letter
 * - Must contain at least one number
 * - Must contain at least one special character
 * - Must not be a commonly used password
 * - Must not contain personal information
 * - Must expire after 90 days
 * - Must not reuse the last 5 passwords
 * - Must lock account after 5 failed attempts
 */
const passwordPolicy = {
  minLength: 12,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  expiryDays: 90,
  preventReuse: 5,
  lockAfterAttempts: 5,
}

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [csvFile, setCsvFile] = useState<File | null>(null)

  // Filter users based on search query and selected role
  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = selectedRole === "all" || user.role === selectedRole

    return matchesSearch && matchesRole
  })

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCsvFile(e.target.files[0])
    }
  }

  const handleBulkUpload = () => {
    // In a real implementation, this would send the CSV file to the backend
    alert(`CSV file "${csvFile?.name}" would be uploaded to create users`)
    setCsvFile(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader title="User Management" organization="National Accident Reporting System" />

      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">User Management</h1>
          <div className="flex gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New User</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new user. They will receive an email to set their password.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input id="email" type="email" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Role
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="police">Police</SelectItem>
                        <SelectItem value="dvla">DVLA</SelectItem>
                        <SelectItem value="insurance">Insurance</SelectItem>
                        <SelectItem value="nic">NIC</SelectItem>
                        <SelectItem value="driver">Driver</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="organization" className="text-right">
                      Organization
                    </Label>
                    <Input id="organization" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create User</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Bulk Upload
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Bulk User Upload</DialogTitle>
                  <DialogDescription>
                    Upload a CSV file to create multiple users at once. Download the template for the required format.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                  <div className="grid gap-2">
                    <Label htmlFor="csv-upload">Upload CSV File</Label>
                    <Input id="csv-upload" type="file" accept=".csv" onChange={handleCsvUpload} />
                    {csvFile && <p className="text-sm text-muted-foreground">Selected file: {csvFile.name}</p>}
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleBulkUpload} disabled={!csvFile}>
                    Upload and Create Users
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>System Users</CardTitle>
            <CardDescription>Manage all users in the accident reporting system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search users..."
                    className="pl-8 w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="police">Police</SelectItem>
                    <SelectItem value="dvla">DVLA</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="nic">NIC</SelectItem>
                    <SelectItem value="driver">Driver</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-muted-foreground">
                Showing {filteredUsers.length} of {mockUsers.length} users
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Password Expiry</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => {
                  // Calculate days until password expiry
                  const today = new Date()
                  const expiryDate = new Date(user.passwordExpiry)
                  const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

                  return (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="capitalize">{user.role}</TableCell>
                      <TableCell>{user.organization}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              daysUntilExpiry <= 7 ? "destructive" : daysUntilExpiry <= 14 ? "warning" : "outline"
                            }
                          >
                            {daysUntilExpiry} days
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem>Reset Password</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash className="h-4 w-4 mr-2" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">Page 1 of 1</div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Password Policy</CardTitle>
            <CardDescription>Current password policy based on ISO/IEC 27001 and 27002 standards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Minimum length:</span>
                  <span className="font-medium">{passwordPolicy.minLength} characters</span>
                </div>
                <div className="flex justify-between">
                  <span>Require uppercase:</span>
                  <span className="font-medium">{passwordPolicy.requireUppercase ? "Yes" : "No"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Require lowercase:</span>
                  <span className="font-medium">{passwordPolicy.requireLowercase ? "Yes" : "No"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Require numbers:</span>
                  <span className="font-medium">{passwordPolicy.requireNumbers ? "Yes" : "No"}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Require special characters:</span>
                  <span className="font-medium">{passwordPolicy.requireSpecialChars ? "Yes" : "No"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Password expiry:</span>
                  <span className="font-medium">{passwordPolicy.expiryDays} days</span>
                </div>
                <div className="flex justify-between">
                  <span>Prevent password reuse:</span>
                  <span className="font-medium">Last {passwordPolicy.preventReuse} passwords</span>
                </div>
                <div className="flex justify-between">
                  <span>Account lockout:</span>
                  <span className="font-medium">After {passwordPolicy.lockAfterAttempts} failed attempts</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

