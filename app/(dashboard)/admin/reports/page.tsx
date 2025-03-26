/**
 * Admin Reports & Analytics Page
 *
 * This component provides an interface for system administrators to view
 * comprehensive reports and analytics about system usage, user activity,
 * and overall system performance.
 *
 * @component
 * @returns {JSX.Element} The admin reports page
 */
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Calendar } from "lucide-react"

export default function AdminReportsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader title="Reports & Analytics" organization="System Administration" />

      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Select defaultValue="last30">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last7">Last 7 Days</SelectItem>
                <SelectItem value="last30">Last 30 Days</SelectItem>
                <SelectItem value="last90">Last 90 Days</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
              <span className="sr-only">Date Range</span>
            </Button>
          </div>

          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
        </div>

        <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Users" value="1,245" change="+12.5%" trend="up" />
          <StatCard title="Active Users" value="876" change="+8.2%" trend="up" />
          <StatCard title="Reports Generated" value="3,567" change="+15.3%" trend="up" />
          <StatCard title="System Uptime" value="99.98%" change="+0.1%" trend="up" />
        </div>

        <Tabs defaultValue="usage">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="usage">System Usage</TabsTrigger>
            <TabsTrigger value="users">User Analytics</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="usage" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>System Usage Trends</CardTitle>
                  <CardDescription>Daily system usage over the selected period</CardDescription>
                </CardHeader>
                <CardContent className="h-80 bg-muted/20 flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization would appear here</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Usage by Organization</CardTitle>
                  <CardDescription>System usage breakdown by organization</CardDescription>
                </CardHeader>
                <CardContent className="h-80 bg-muted/20 flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization would appear here</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Feature Usage</CardTitle>
                  <CardDescription>Most frequently used system features</CardDescription>
                </CardHeader>
                <CardContent className="h-80 bg-muted/20 flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization would appear here</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>New user registrations over time</CardDescription>
                </CardHeader>
                <CardContent className="h-80 bg-muted/20 flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization would appear here</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Distribution</CardTitle>
                  <CardDescription>User distribution by role and organization</CardDescription>
                </CardHeader>
                <CardContent className="h-80 bg-muted/20 flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization would appear here</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Users</CardTitle>
                  <CardDescription>Daily active users over time</CardDescription>
                </CardHeader>
                <CardContent className="h-80 bg-muted/20 flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization would appear here</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                  <CardDescription>Average session duration and activity</CardDescription>
                </CardHeader>
                <CardContent className="h-80 bg-muted/20 flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization would appear here</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>System Response Time</CardTitle>
                  <CardDescription>Average response time for system operations</CardDescription>
                </CardHeader>
                <CardContent className="h-80 bg-muted/20 flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization would appear here</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Database Performance</CardTitle>
                  <CardDescription>Database query performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="h-80 bg-muted/20 flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization would appear here</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Server Load</CardTitle>
                  <CardDescription>Server CPU and memory utilization</CardDescription>
                </CardHeader>
                <CardContent className="h-80 bg-muted/20 flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization would appear here</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Login Attempts</CardTitle>
                  <CardDescription>Successful vs. failed login attempts</CardDescription>
                </CardHeader>
                <CardContent className="h-80 bg-muted/20 flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization would appear here</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Incidents</CardTitle>
                  <CardDescription>Security incidents over time</CardDescription>
                </CardHeader>
                <CardContent className="h-80 bg-muted/20 flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization would appear here</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Password Changes</CardTitle>
                  <CardDescription>Password change frequency by user group</CardDescription>
                </CardHeader>
                <CardContent className="h-80 bg-muted/20 flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization would appear here</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Permission Changes</CardTitle>
                  <CardDescription>User permission and role changes</CardDescription>
                </CardHeader>
                <CardContent className="h-80 bg-muted/20 flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization would appear here</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  change,
  trend,
}: {
  title: string
  value: string
  change: string
  trend: "up" | "down"
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className={`mt-2 flex items-center text-xs ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
          {change}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`ml-1 h-4 w-4 ${trend === "down" && "rotate-180"}`}
          >
            <path
              fillRule="evenodd"
              d="M12 7a1 1 0 01-1 1H9a1 1 0 01-1-1V6a1 1 0 011-1h2a1 1 0 011 1v1zm-1 4a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1v-1a1 1 0 00-1-1h-2z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </CardContent>
    </Card>
  )
}

