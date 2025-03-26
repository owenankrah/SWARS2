"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { Car, FileText, Shield, Star } from "lucide-react"
import Link from "next/link"

export default function DriverDashboard() {
  const { user } = useAuth()

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Driver Dashboard</h1>
        <div>
          <Badge className="ml-2">Premium Driver</Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Insurance Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5.0</div>
            <p className="text-xs text-muted-foreground">Excellent driver rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Premium</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₵1,250</div>
            <p className="text-xs text-muted-foreground">Due on 15/06/2023</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Claims</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Insured Vehicles</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">All active</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>My Vehicles</CardTitle>
            <CardDescription>Your insured vehicles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Toyota Corolla</p>
                  <p className="text-sm text-muted-foreground">GR-1234-20 • 2020</p>
                </div>
                <Badge>Active</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Honda Civic</p>
                  <p className="text-sm text-muted-foreground">GW-5678-21 • 2021</p>
                </div>
                <Badge>Active</Badge>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" asChild className="w-full">
                <Link href="/driver/vehicles">View All Vehicles</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Claims</CardTitle>
            <CardDescription>Your recent insurance claims</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Accident Claim #CLM001</p>
                  <p className="text-sm text-muted-foreground">Toyota Corolla • 15/05/2023</p>
                </div>
                <Badge>In Progress</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Accident Claim #CLM002</p>
                  <p className="text-sm text-muted-foreground">Honda Civic • 10/03/2023</p>
                </div>
                <Badge variant="secondary">Completed</Badge>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" asChild className="w-full">
                <Link href="/driver/claims-history">View All Claims</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Accident Reports</CardTitle>
            <CardDescription>View your accident reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Accident Report #ACC-12345</p>
                  <p className="text-sm text-muted-foreground">Toyota Corolla • 15/05/2023</p>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/driver/accident-reports/ACC-12345">
                    <FileText className="h-4 w-4 mr-2" />
                    View
                  </Link>
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Accident Report #ACC-23456</p>
                  <p className="text-sm text-muted-foreground">Honda Civic • 10/03/2023</p>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/driver/accident-reports/ACC-23456">
                    <FileText className="h-4 w-4 mr-2" />
                    View
                  </Link>
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" asChild className="w-full">
                <Link href="/driver/accident-reports">View All Reports</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Insurance Rating Factors</CardTitle>
            <CardDescription>Factors affecting your insurance rating</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm">Driver Experience</p>
                <div className="flex items-center">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full w-[90%]"></div>
                  </div>
                  <span className="ml-2 text-sm">9/10</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Claims History</p>
                <div className="flex items-center">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full w-[80%]"></div>
                  </div>
                  <span className="ml-2 text-sm">8/10</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Vehicle Safety</p>
                <div className="flex items-center">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full w-[95%]"></div>
                  </div>
                  <span className="ml-2 text-sm">9.5/10</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Payment History</p>
                <div className="flex items-center">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full w-[100%]"></div>
                  </div>
                  <span className="ml-2 text-sm">10/10</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" asChild className="w-full">
                <Link href="/driver/rating">View Full Rating</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

