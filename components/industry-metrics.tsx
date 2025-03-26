"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

/**
 * Industry Metrics Component
 *
 * This component displays metrics and charts related to the insurance industry.
 * It includes data on claims, premiums, and company performance.
 *
 * @component
 * @returns {JSX.Element} The industry metrics UI with charts
 *
 * @backend
 * Required API endpoints:
 * - GET /api/nic/industry-metrics - Fetch industry metrics data
 * - GET /api/nic/companies/performance - Fetch company performance data
 */
export function IndustryMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Insurance Industry Metrics</CardTitle>
        <CardDescription>Comprehensive overview of the insurance industry performance</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="claims">
          <TabsList className="mb-4">
            <TabsTrigger value="claims">Claims</TabsTrigger>
            <TabsTrigger value="premiums">Premiums</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
          </TabsList>

          <TabsContent value="claims">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
                <p className="text-muted-foreground">Claims volume by insurance company</p>
              </div>
              <div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
                <p className="text-muted-foreground">Claims value by insurance company</p>
              </div>
              <div className="h-[300px] flex items-center justify-center bg-muted rounded-md md:col-span-2">
                <p className="text-muted-foreground">Claims trend over time (quarterly)</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="premiums">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
                <p className="text-muted-foreground">Premium collection by company</p>
              </div>
              <div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
                <p className="text-muted-foreground">Premium growth year-over-year</p>
              </div>
              <div className="h-[300px] flex items-center justify-center bg-muted rounded-md md:col-span-2">
                <p className="text-muted-foreground">Premium to claims ratio by company</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="companies">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
                <p className="text-muted-foreground">Market share by company</p>
              </div>
              <div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
                <p className="text-muted-foreground">Company performance metrics</p>
              </div>
              <div className="h-[300px] flex items-center justify-center bg-muted rounded-md md:col-span-2">
                <p className="text-muted-foreground">Customer satisfaction ratings</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

