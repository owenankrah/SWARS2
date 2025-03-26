"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

/**
 * Claims Overview Component
 *
 * This component displays charts and metrics related to insurance claims.
 * It includes distribution by status, value, and trends over time.
 *
 * @component
 * @returns {JSX.Element} The claims overview UI with charts
 *
 * @backend
 * Required API endpoints:
 * - GET /api/claims/overview - Fetch claims overview data for charts
 * - GET /api/claims/statistics - Fetch statistical data about claims
 */
export function ClaimsOverview() {
  // This would be replaced with actual chart implementation
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Claims by Status</CardTitle>
          <CardDescription>Distribution of claims by current status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center bg-muted rounded-md">
            <p className="text-muted-foreground">Pie chart showing claim status distribution</p>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm">Pending (45%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span className="text-sm">In Progress (30%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm">Approved (20%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-sm">Rejected (5%)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Claims by Value</CardTitle>
          <CardDescription>Distribution of claims by monetary value</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center bg-muted rounded-md">
            <p className="text-muted-foreground">Bar chart showing claim value distribution</p>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
              <span className="text-sm">₵0-5,000 (35%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
              <span className="text-sm">₵5,001-10,000 (25%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm">₵10,001-20,000 (20%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-cyan-500 mr-2"></div>
              <span className="text-sm">₵20,001+ (20%)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Claims Over Time</CardTitle>
          <CardDescription>Monthly trend of claims filed</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center bg-muted rounded-md">
            <p className="text-muted-foreground">Line chart showing claims over time</p>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">+12%</span> increase compared to previous quarter
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

