"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { AccidentMap } from "@/components/accident-map"
import { RecentAccidents } from "@/components/recent-accidents"
import { PendingAssessments } from "@/components/pending-assessments"
import { RecentUploads } from "@/components/recent-uploads"
import { useAuth } from "@/lib/auth-context"
import { getAccidentStatistics } from "@/services/accident-service"
import { getPendingAssessments } from "@/services/accident-service"
import { getRecentUploads } from "@/services/evidence-service"

export default function DVLADashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    total: 0,
    pendingAssessment: 0,
    assessed: 0,
    evidenceUploaded: 0,
    thisMonth: 0,
    thisWeek: 0,
  })
  const [pendingAssessments, setPendingAssessments] = useState([])
  const [recentUploads, setRecentUploads] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const statistics = await getAccidentStatistics()
          setStats(statistics)

          const assessments = await getPendingAssessments()
          setPendingAssessments(assessments)

          const uploads = await getRecentUploads()
          setRecentUploads(uploads)
        } catch (error) {
          console.error("Error fetching dashboard data:", error)
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
      <DashboardHeader title="DVLA Dashboard" user={user} />

      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assessments">Pending Assessments</TabsTrigger>
            <TabsTrigger value="uploads">Recent Uploads</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Accidents</CardTitle>
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
                  <div className="text-2xl font-bold">{stats.total}</div>
                  <p className="text-xs text-muted-foreground">+{stats.thisMonth} this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Assessments</CardTitle>
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
                  <div className="text-2xl font-bold">{stats.pendingAssessment}</div>
                  <p className="text-xs text-muted-foreground">Awaiting damage assessment</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Assessed Vehicles</CardTitle>
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
                  <div className="text-2xl font-bold">{stats.assessed}</div>
                  <p className="text-xs text-muted-foreground">Completed damage assessments</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Evidence Uploads</CardTitle>
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
                  <div className="text-2xl font-bold">{stats.evidenceUploaded}</div>
                  <p className="text-xs text-muted-foreground">Photos and videos uploaded</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Accident Map</CardTitle>
                  <CardDescription>Geographic distribution of accidents across Ghana</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <AccidentMap />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Accidents</CardTitle>
                  <CardDescription>Latest reported incidents</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentAccidents />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="assessments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Damage Assessments</CardTitle>
                <CardDescription>Vehicles awaiting damage assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <PendingAssessments pendingAssessments={pendingAssessments} isLoading={isLoading} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="uploads" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Evidence Uploads</CardTitle>
                <CardDescription>Recently uploaded photos and videos</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentUploads recentUploads={recentUploads} isLoading={isLoading} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

