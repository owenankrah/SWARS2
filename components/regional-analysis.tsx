"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

/**
 * Regional Analysis Component
 *
 * This component displays accident and claims data broken down by region.
 * It includes maps, charts, and statistics for different regions.
 *
 * @component
 * @returns {JSX.Element} The regional analysis UI with maps and charts
 *
 * @backend
 * Required API endpoints:
 * - GET /api/nic/regional-analysis - Fetch regional analysis data
 * - GET /api/nic/regions/:id/statistics - Fetch statistics for a specific region
 */
export function RegionalAnalysis() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Regional Analysis</CardTitle>
          <CardDescription>Accident and claims data by region</CardDescription>
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Region" />
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
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="accidents">
          <TabsList className="mb-4">
            <TabsTrigger value="accidents">Accidents</TabsTrigger>
            <TabsTrigger value="claims">Claims</TabsTrigger>
            <TabsTrigger value="hotspots">Hotspots</TabsTrigger>
          </TabsList>

          <TabsContent value="accidents">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
                <p className="text-muted-foreground">Accident frequency by region</p>
              </div>
              <div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
                <p className="text-muted-foreground">Accident severity by region</p>
              </div>
              <div className="h-[300px] flex items-center justify-center bg-muted rounded-md md:col-span-2">
                <p className="text-muted-foreground">Regional map with accident markers</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="claims">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
                <p className="text-muted-foreground">Claim volume by region</p>
              </div>
              <div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
                <p className="text-muted-foreground">Average claim value by region</p>
              </div>
              <div className="h-[300px] flex items-center justify-center bg-muted rounded-md md:col-span-2">
                <p className="text-muted-foreground">Regional claim processing efficiency</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="hotspots">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="h-[300px] flex items-center justify-center bg-muted rounded-md md:col-span-2">
                <p className="text-muted-foreground">Accident hotspot map with heat overlay</p>
              </div>
              <div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
                <p className="text-muted-foreground">Top 10 accident-prone locations</p>
              </div>
              <div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
                <p className="text-muted-foreground">Accident time patterns</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

