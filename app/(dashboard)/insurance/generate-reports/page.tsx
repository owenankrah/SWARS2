import type React from "react"
/**
 * Insurance Generate Reports Page
 *
 * This component provides an interface for insurance company staff to generate
 * various reports related to claims, accident statistics, and risk analysis.
 *
 * @component
 * @returns {JSX.Element} The insurance generate reports page
 */
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileBarChart, FileSpreadsheet, Download, Printer, DollarSign } from "lucide-react"

export default function InsuranceGenerateReportsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader title="Generate Reports" organization="Insurance Company" />

      <div className="container mx-auto py-6">
        <Tabs defaultValue="claims">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="claims">Claims Reports</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            <TabsTrigger value="financial">Financial Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="claims" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ReportCard
                title="Claims Summary"
                description="Summary of all claims processed in the current period"
                icon={<FileSpreadsheet className="h-5 w-5" />}
              />
              <ReportCard
                title="Claims by Vehicle Type"
                description="Analysis of claims by vehicle type and category"
                icon={<FileBarChart className="h-5 w-5" />}
              />
              <ReportCard
                title="Claims by Severity"
                description="Breakdown of claims by accident severity"
                icon={<FileBarChart className="h-5 w-5" />}
              />
              <ReportCard
                title="Claims Processing Time"
                description="Analysis of claim processing efficiency and timelines"
                icon={<FileBarChart className="h-5 w-5" />}
              />
              <ReportCard
                title="Denied Claims Analysis"
                description="Analysis of denied claims and reasons for denial"
                icon={<FileBarChart className="h-5 w-5" />}
              />
              <ReportCard
                title="Fraud Detection Report"
                description="Report on potential fraudulent claims detected"
                icon={<FileBarChart className="h-5 w-5" />}
              />
            </div>
          </TabsContent>

          <TabsContent value="risk" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ReportCard
                title="Driver Risk Profiles"
                description="Risk assessment profiles for insured drivers"
                icon={<FileBarChart className="h-5 w-5" />}
              />
              <ReportCard
                title="Geographic Risk Analysis"
                description="Risk analysis by geographic location and region"
                icon={<FileBarChart className="h-5 w-5" />}
              />
              <ReportCard
                title="Vehicle Risk Categories"
                description="Risk assessment by vehicle make, model and year"
                icon={<FileBarChart className="h-5 w-5" />}
              />
              <ReportCard
                title="Seasonal Risk Patterns"
                description="Analysis of risk patterns by season and time of year"
                icon={<FileBarChart className="h-5 w-5" />}
              />
              <ReportCard
                title="Policy Risk Assessment"
                description="Risk assessment for different policy types"
                icon={<FileBarChart className="h-5 w-5" />}
              />
              <ReportCard
                title="Predictive Risk Analysis"
                description="Predictive modeling for future risk assessment"
                icon={<FileBarChart className="h-5 w-5" />}
              />
            </div>
          </TabsContent>

          <TabsContent value="financial" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ReportCard
                title="Premium vs. Claims"
                description="Analysis of premium income versus claim payouts"
                icon={<DollarSign className="h-5 w-5" />}
              />
              <ReportCard
                title="Claims Settlement Costs"
                description="Financial analysis of claim settlement costs"
                icon={<DollarSign className="h-5 w-5" />}
              />
              <ReportCard
                title="Profitability by Policy Type"
                description="Financial performance analysis by policy type"
                icon={<DollarSign className="h-5 w-5" />}
              />
              <ReportCard
                title="Reserve Analysis"
                description="Analysis of reserve adequacy for pending claims"
                icon={<DollarSign className="h-5 w-5" />}
              />
              <ReportCard
                title="Reinsurance Analysis"
                description="Analysis of reinsurance costs and benefits"
                icon={<DollarSign className="h-5 w-5" />}
              />
              <ReportCard
                title="Financial Forecasting"
                description="Financial forecasting based on claims trends"
                icon={<DollarSign className="h-5 w-5" />}
              />
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

