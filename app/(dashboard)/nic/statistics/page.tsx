/**
 * NIC Statistics Page
 *
 * This component provides an interface for NIC staff to view
 * comprehensive statistics about the insurance industry, accident trends,
 * and claim patterns across Ghana.
 *
 * @component
 * @returns {JSX.Element} The NIC statistics page
 */
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NICStatisticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader title="Statistics" organization="National Insurance Commission" />

      <div className="container mx-auto py-6">
        <div className="flex justify-end mb-6">
          <Select defaultValue="2023">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2020">2020</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Accidents"
            value="12,456"
            change="+5.2%"
            trend="up"
            description="Total reported accidents in Ghana"
          />
          <StatCard title="Total Claims" value="8,932" change="+7.8%" trend="up" description="Insurance claims filed" />
          <StatCard
            title="Claim Settlement Rate"
            value="76.4%"
            change="+2.1%"
            trend="up"
            description="Percentage of claims settled"
          />
          <StatCard
            title="Average Claim Amount"
            value="₵15,245"
            change="-3.5%"
            trend="down"
            description="Average claim payout"
          />
        </div>

        <Tabs defaultValue="accident">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="accident">Accident Statistics</TabsTrigger>
            <TabsTrigger value="insurance">Insurance Statistics</TabsTrigger>
            <TabsTrigger value="regional">Regional Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="accident" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Accident Trends (Monthly)</CardTitle>
                  <CardDescription>Monthly accident trends across Ghana</CardDescription>
                </CardHeader>
                <CardContent className="h-80 bg-muted/20 flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization would appear here</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Accident Types</CardTitle>
                  <CardDescription>Distribution of accidents by type</CardDescription>
                </CardHeader>
                <CardContent className="h-80 bg-muted/20 flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization would appear here</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Accident Severity</CardTitle>
                  <CardDescription>Distribution of accidents by severity</CardDescription>
                </CardHeader>
                <CardContent className="h-80 bg-muted/20 flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization would appear here</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insurance" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Claims by Insurance Company</CardTitle>
                  <CardDescription>Distribution of claims across insurance companies</CardDescription>
                </CardHeader>
                <CardContent className="h-80 bg-muted/20 flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization would appear here</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Claims Settlement Time</CardTitle>
                  <CardDescription>Average time to settle claims by company</CardDescription>
                </CardHeader>
                <CardContent className="h-80 bg-muted/20 flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization would appear here</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Premium vs. Claims Ratio</CardTitle>
                  <CardDescription>Ratio of premiums collected to claims paid</CardDescription>
                </CardHeader>
                <CardContent className="h-80 bg-muted/20 flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization would appear here</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Claim Rejection Reasons</CardTitle>
                  <CardDescription>Common reasons for claim rejections</CardDescription>
                </CardHeader>
                <CardContent className="h-80 bg-muted/20 flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization would appear here</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="regional" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Accident Hotspots</CardTitle>
                  <CardDescription>Geographic distribution of accidents across Ghana</CardDescription>
                </CardHeader>
                <CardContent className="h-96 bg-muted/20 flex items-center justify-center">
                  <p className="text-muted-foreground">Map visualization would appear here</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Accident Rates</CardTitle>
                  <CardDescription>Accident rates by region</CardDescription>
                </CardHeader>
                <CardContent className="h-80 bg-muted/20 flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization would appear here</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Claim Amounts</CardTitle>
                  <CardDescription>Average claim amounts by region</CardDescription>
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
  description,
}: {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  description: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
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

