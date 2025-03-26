"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { getDriverStatistics } from "@/services/user-service"
import { getDriverClaims } from "@/services/claim-service"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, CarIcon, CheckCircleIcon, ClockIcon, AlertCircleIcon } from "lucide-react"
import Link from "next/link"

export default function DriverDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalAccidents: 0,
    totalClaims: 0,
    pendingClaims: 0,
    approvedClaims: 0,
    rejectedClaims: 0,
    driverRating: 0,
    vehicles: 0,
  })
  const [claims, setClaims] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const driverStats = await getDriverStatistics(user.id)
          setStats(driverStats)

          const driverClaims = await getDriverClaims(user.id)
          setClaims(driverClaims)
        } catch (error) {
          console.error("Error fetching driver data:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchData()
  }, [user])

  if (!user) return null

  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader title="Driver Dashboard" user={user} />

      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button asChild>
              <Link href="/dashboard/driver/initiate-claim">Initiate New Claim</Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="claims">Claims</TabsTrigger>
            <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Driver Rating</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.driverRating}/10</div>
                  <p className="text-xs text-muted-foreground">Your current driver safety rating</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Claims</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalClaims}</div>
                  <p className="text-xs text-muted-foreground">Total insurance claims filed</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Claims</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pendingClaims}</div>
                  <p className="text-xs text-muted-foreground">Claims awaiting processing</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Registered Vehicles</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.vehicles}</div>
                  <p className="text-xs text-muted-foreground">Vehicles registered to you</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-1">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Claims</CardTitle>
                  <CardDescription>Your most recent insurance claims</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex items-center justify-center h-40">
                      <p>Loading claims...</p>
                    </div>
                  ) : claims.length > 0 ? (
                    <div className="space-y-4">
                      {claims.slice(0, 5).map((claim: any) => (
                        <div key={claim.id} className="flex items-center justify-between border-b pb-4">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium">{claim.accidentId}</h4>
                              <Badge
                                variant={
                                  claim.status === "approved"
                                    ? "success"
                                    : claim.status === "rejected"
                                      ? "destructive"
                                      : "outline"
                                }
                              >
                                {claim.status}
                              </Badge>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <CalendarIcon className="mr-1 h-4 w-4" />
                              <span>{new Date(claim.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <Button asChild variant="ghost" size="sm">
                            <Link href={`/dashboard/driver/claim-status?id=${claim.id}`}>View Details</Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-40 space-y-3">
                      <p className="text-muted-foreground">You have no claims yet</p>
                      <Button asChild>
                        <Link href="/dashboard/driver/initiate-claim">Initiate New Claim</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="claims" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Claims History</CardTitle>
                <CardDescription>View all your insurance claims</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center h-40">
                    <p>Loading claims...</p>
                  </div>
                ) : claims.length > 0 ? (
                  <div className="space-y-4">
                    {claims.map((claim: any) => (
                      <div key={claim.id} className="flex items-center justify-between border-b pb-4">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{claim.accidentId}</h4>
                            <Badge
                              variant={
                                claim.status === "approved"
                                  ? "success"
                                  : claim.status === "rejected"
                                    ? "destructive"
                                    : "outline"
                              }
                            >
                              {claim.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <CalendarIcon className="mr-1 h-4 w-4" />
                              <span>{new Date(claim.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center">
                              <CarIcon className="mr-1 h-4 w-4" />
                              <span>{claim.vehiclePlate}</span>
                            </div>
                            {claim.status === "approved" && (
                              <div className="flex items-center">
                                <CheckCircleIcon className="mr-1 h-4 w-4 text-green-500" />
                                <span>₵{claim.amount.toLocaleString()}</span>
                              </div>
                            )}
                            {claim.status === "pending" && (
                              <div className="flex items-center">
                                <ClockIcon className="mr-1 h-4 w-4 text-yellow-500" />
                                <span>Processing</span>
                              </div>
                            )}
                            {claim.status === "rejected" && (
                              <div className="flex items-center">
                                <AlertCircleIcon className="mr-1 h-4 w-4 text-red-500" />
                                <span>Rejected</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <Button asChild variant="ghost" size="sm">
                          <Link href={`/dashboard/driver/claim-status?id=${claim.id}`}>View Details</Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-40 space-y-3">
                    <p className="text-muted-foreground">You have no claims yet</p>
                    <Button asChild>
                      <Link href="/dashboard/driver/initiate-claim">Initiate New Claim</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vehicles" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Vehicles</CardTitle>
                <CardDescription>Vehicles registered to your driver's license</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center h-40">
                    <p>Loading vehicles...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Button asChild>
                      <Link href="/dashboard/driver/vehicles">Manage Vehicles</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

