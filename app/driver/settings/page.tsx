/**
 * Driver Settings Page
 *
 * This component provides a settings interface for drivers to manage:
 * - Personal information
 * - Notification preferences
 * - Security settings
 * - Connected accounts
 *
 * @component
 * @returns {JSX.Element} The driver settings UI
 *
 * @backend
 * Required API endpoints:
 * - GET /api/drivers/:id/settings - Fetch driver settings
 * - PUT /api/drivers/:id/settings - Update driver settings
 * - PUT /api/drivers/:id/password - Update driver password
 */
"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { DashboardHeader } from "@/components/dashboard-header"

export default function DriverSettings() {
  const { user } = useAuth()
  const [isUpdating, setIsUpdating] = useState(false)

  const handleSavePersonalInfo = () => {
    setIsUpdating(true)
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false)
    }, 1000)
  }

  const handleSavePassword = () => {
    setIsUpdating(true)
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false)
    }, 1000)
  }

  const handleSaveNotifications = () => {
    setIsUpdating(true)
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader title="Account Settings" organization="Driver Portal" />

      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList>
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue={user?.name || ""} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={user?.email || ""} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+233 XX XXX XXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="license">Driver's License Number</Label>
                    <Input id="license" defaultValue="GH-DL-12345678" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" defaultValue="123 Main Street" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue="Accra" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="region">Region</Label>
                    <Input id="region" defaultValue="Greater Accra" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input id="postalCode" defaultValue="00233" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSavePersonalInfo} disabled={isUpdating}>
                  {isUpdating ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Update your password. Passwords must meet security requirements.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>

                <div className="text-sm text-muted-foreground">
                  <p className="font-medium mb-2">Password Requirements:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Minimum 12 characters</li>
                    <li>At least one uppercase letter</li>
                    <li>At least one lowercase letter</li>
                    <li>At least one number</li>
                    <li>At least one special character</li>
                  </ul>
                  <p className="mt-2">Your password will expire in 90 days.</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSavePassword} disabled={isUpdating}>
                  {isUpdating ? "Updating..." : "Update Password"}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Authentication</p>
                    <p className="text-sm text-muted-foreground">Receive a code via SMS to verify your identity</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Authentication</p>
                    <p className="text-sm text-muted-foreground">Receive a code via email to verify your identity</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Authenticator App</p>
                    <p className="text-sm text-muted-foreground">
                      Use an authenticator app to generate verification codes
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Configure 2FA</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Accident Reports</h3>
                    <div className="mt-2 space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="accident-email">Email Notifications</Label>
                        <Switch id="accident-email" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="accident-sms">SMS Notifications</Label>
                        <Switch id="accident-sms" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium">Claims</h3>
                    <div className="mt-2 space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="claims-email">Email Notifications</Label>
                        <Switch id="claims-email" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="claims-sms">SMS Notifications</Label>
                        <Switch id="claims-sms" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="claims-status">Status Updates</Label>
                        <Switch id="claims-status" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium">System</h3>
                    <div className="mt-2 space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="system-security">Security Alerts</Label>
                        <Switch id="system-security" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="system-updates">System Updates</Label>
                        <Switch id="system-updates" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="system-marketing">Marketing & Promotions</Label>
                        <Switch id="system-marketing" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveNotifications} disabled={isUpdating}>
                  {isUpdating ? "Saving..." : "Save Preferences"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

