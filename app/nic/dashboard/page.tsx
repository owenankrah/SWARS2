/**
 * NIC Dashboard Page
 *
 * This component serves as the main dashboard for National Insurance Commission users, displaying:
 * - Key metrics (total accidents, insurance companies, claims growth)
 * - Industry metrics
 * - Regional analysis
 *
 * @component
 * @returns {JSX.Element} The NIC dashboard UI
 *
 * @backend
 * Required API endpoints:
 * - GET /api/nic/dashboard - Fetch dashboard metrics
 * - GET /api/nic/industry-metrics - Fetch industry metrics data
 * - GET /api/nic/regional-analysis - Fetch regional analysis data
 */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, FileSpreadsheet, FileText, TrendingUp, Users } from "lucide-react"
import { IndustryMetrics } from "@/components/industry-metrics"
import { RegionalAnalysis } from "@/components/regional-analysis"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NICDashboard() {
  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">NIC Dashboard</h1>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/nic/reports">
              <FileText className="h-4 w-4 mr-2" />
              Generate Reports
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Accidents</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">This quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Insurance Companies</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">27</div>
            <p className="text-xs text-muted-foreground">Active in system</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Claims Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.5%</div>
            <p className="text-xs text-muted-foreground">Year over year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Reports Generated</CardTitle>
            <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="metrics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="metrics">Industry Metrics</TabsTrigger>
          <TabsTrigger value="regional">Regional Analysis</TabsTrigger>
        </TabsList>
        <TabsContent value="metrics" className="space-y-4">
          <IndustryMetrics />
        </TabsContent>
        <TabsContent value="regional" className="space-y-4">
          <RegionalAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  )
}

