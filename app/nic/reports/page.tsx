"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { BarChart3, Download, FileSpreadsheet, LineChart, PieChart } from "lucide-react"

export default function ReportsPage() {
  const [reportType, setReportType] = useState("accident")
  const [dateRange, setDateRange] = useState("month")

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Reports & Analytics</h1>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Accidents</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+12% from previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Claims</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">856</div>
            <p className="text-xs text-muted-foreground">+8% from previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Claim Value</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₵11,250</div>
            <p className="text-xs text-muted-foreground">+5% from previous period</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Generate Report</CardTitle>
          <CardDescription>Create custom reports based on your requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="report-type">Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger id="report-type">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="accident">Accident Statistics</SelectItem>
                    <SelectItem value="claim">Claim Analysis</SelectItem>
                    <SelectItem value="insurance">Insurance Performance</SelectItem>
                    <SelectItem value="regional">Regional Analysis</SelectItem>
                    <SelectItem value="turnaround">Turnaround Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date-range">Date Range</Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger id="date-range">
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Last Week</SelectItem>
                    <SelectItem value="month">Last Month</SelectItem>
                    <SelectItem value="quarter">Last Quarter</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {dateRange === "custom" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input id="start-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input id="end-date" type="date" />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="region">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="greater-accra">Greater Accra</SelectItem>
                    <SelectItem value="ashanti">Ashanti</SelectItem>
                    <SelectItem value="western">Western</SelectItem>
                    <SelectItem value="eastern">Eastern</SelectItem>
                    <SelectItem value="central">Central</SelectItem>
                    <SelectItem value="northern">Northern</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Include in Report</Label>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include-summary" defaultChecked />
                    <Label htmlFor="include-summary">Executive Summary</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include-charts" defaultChecked />
                    <Label htmlFor="include-charts">Charts & Graphs</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include-tables" defaultChecked />
                    <Label htmlFor="include-tables">Data Tables</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include-trends" defaultChecked />
                    <Label htmlFor="include-trends">Trend Analysis</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include-recommendations" />
                    <Label htmlFor="include-recommendations">Recommendations</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Format</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="format-pdf" defaultChecked />
                    <Label htmlFor="format-pdf">PDF</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="format-excel" />
                    <Label htmlFor="format-excel">Excel</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="format-csv" />
                    <Label htmlFor="format-csv">CSV</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="format-json" />
                    <Label htmlFor="format-json">JSON</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            Generate Report
          </Button>
        </CardFooter>
      </Card>

      <Tabs defaultValue="accident" className="space-y-4">
        <TabsList>
          <TabsTrigger value="accident">Accident Reports</TabsTrigger>
          <TabsTrigger value="claim">Claim Reports</TabsTrigger>
          <TabsTrigger value="insurance">Insurance Reports</TabsTrigger>
          <TabsTrigger value="saved">Saved Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="accident" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Accident Reports</CardTitle>
              <CardDescription>Pre-generated accident statistics reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  "Monthly Accident Summary",
                  "Accident Severity Analysis",
                  "Accident Hotspot Report",
                  "Driver Demographics Analysis",
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{report}</p>
                      <p className="text-sm text-muted-foreground">Generated on May 1, 2023</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="claim" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Claim Reports</CardTitle>
              <CardDescription>Pre-generated claim analysis reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  "Claim Volume Trends",
                  "Claim Value Analysis",
                  "Claim Processing Efficiency",
                  "Claim Rejection Analysis",
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{report}</p>
                      <p className="text-sm text-muted-foreground">Generated on May 5, 2023</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insurance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Insurance Reports</CardTitle>
              <CardDescription>Pre-generated insurance performance reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  "Insurance Company Performance",
                  "Market Share Analysis",
                  "Premium to Claim Ratio",
                  "Customer Satisfaction Index",
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{report}</p>
                      <p className="text-sm text-muted-foreground">Generated on May 10, 2023</p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Saved Reports</CardTitle>
              <CardDescription>Your saved custom reports</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No saved reports found</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

