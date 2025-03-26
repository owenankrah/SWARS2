import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BadgeDollarSign, FileSpreadsheet, FileText, ShieldCheck, Timer } from "lucide-react"
import { ClaimsOverview } from "@/components/claims-overview"
import { RecentClaims } from "@/components/recent-claims"
import { Button } from "@/components/ui/button"
import Link from "next/link"

/**
 * Insurance Dashboard Page
 *
 * This component serves as the main dashboard for insurance company users, displaying:
 * - Key metrics (active claims, claim amounts, processing time)
 * - Claims overview charts
 * - Recent claims
 *
 * @component
 * @returns {JSX.Element} The insurance dashboard UI
 *
 * @backend
 * Required API endpoints:
 * - GET /api/insurance/dashboard - Fetch dashboard metrics
 * - GET /api/claims/overview - Fetch claims overview data for charts
 * - GET /api/claims/recent - Fetch recent claims
 */
export default function InsuranceDashboard() {
  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Insurance Dashboard</h1>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/insurance/claims">
              <FileText className="h-4 w-4 mr-2" />
              View & Review Claims
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Claims</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">12 new this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Claim Amount</CardTitle>
            <BadgeDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₵245K</div>
            <p className="text-xs text-muted-foreground">+₵32K from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Processing Time</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.2d</div>
            <p className="text-xs text-muted-foreground">-0.8d from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Reports Generated</CardTitle>
            <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Claims Overview</TabsTrigger>
          <TabsTrigger value="recent">Recent Claims</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <ClaimsOverview />
        </TabsContent>
        <TabsContent value="recent" className="space-y-4">
          <RecentClaims />
        </TabsContent>
      </Tabs>
    </div>
  )
}

