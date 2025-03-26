import type React from "react"
/**
 * Police Generate Reports Page
 *
 * This component provides an interface for police officers to generate
 * various reports and statistics based on accident data.
 *
 * @component
 * @returns {JSX.Element} The police generate reports page
 */
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileBarChart, FileSpreadsheet, Download, Printer } from "lucide-react"

export default function PoliceGenerateReportsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader title="Generate Reports" organization="Ghana Police Service" />

      <div className="container mx-auto py-6">
        <Tabs defaultValue="standard">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="standard">Standard Reports</TabsTrigger>
            <TabsTrigger value="custom">Custom Reports</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="standard" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ReportCard
                title="Monthly Accident Summary"
                description="Summary of all accidents reported in the current month"
                icon={<FileSpreadsheet className="h-5 w-5" />}
              />
              <ReportCard
                title="Accident Hotspots"
                description="Geographic analysis of accident frequency by location"
                icon={<FileBarChart className="h-5 w-5" />}
              />
              <ReportCard
                title="Driver Fault Analysis"
                description="Analysis of accidents by driver fault determination"
                icon={<FileBarChart className="h-5 w-5" />}
              />
              <ReportCard
                title="Vehicle Type Analysis"
                description="Breakdown of accidents by vehicle type and category"
                icon={<FileBarChart className="h-5 w-5" />}
              />
              <ReportCard
                title="Time of Day Analysis"
                description="Analysis of accidents by time of day and day of week"
                icon={<FileBarChart className="h-5 w-5" />}
              />
              <ReportCard
                title="Severity Analysis"
                description="Breakdown of accidents by severity and outcome"
                icon={<FileBarChart className="h-5 w-5" />}
              />
            </div>
          </TabsContent>

          <TabsContent value="custom" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Custom Report Builder</CardTitle>
                <CardDescription>
                  Create a custom report by selecting the data points and filters you need
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Custom report builder interface would go here, allowing users to select:
                </p>
                <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
                  <li>Date ranges</li>
                  <li>Geographic areas</li>
                  <li>Vehicle types</li>
                  <li>Accident types</li>
                  <li>Severity levels</li>
                  <li>And other filters</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Generate Custom Report</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="statistics" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Accident Trends</CardTitle>
                  <CardDescription>Monthly accident trends over the past year</CardDescription>
                </CardHeader>
                <CardContent className="h-80 bg-muted/20 flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization would appear here</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Fault Distribution</CardTitle>
                  <CardDescription>Distribution of fault determination in accidents</CardDescription>
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

function ReportCard({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button size="sm" variant="outline">
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
        <Button size="sm">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  )
}

