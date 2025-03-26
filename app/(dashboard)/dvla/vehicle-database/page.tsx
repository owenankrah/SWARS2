/**
 * DVLA Vehicle Database Page
 *
 * This component provides an interface for DVLA officers to search and manage
 * the vehicle database, including registration details, ownership history,
 * and accident history.
 *
 * @component
 * @returns {JSX.Element} The DVLA vehicle database page
 */
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Download, Plus } from "lucide-react"

export default function DVLAVehicleDatabasePage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader title="Vehicle Database" organization="Driver and Vehicle Licensing Authority" />

      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4 w-full max-w-sm">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search vehicles..." className="w-full pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Vehicle
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Vehicles</TabsTrigger>
            <TabsTrigger value="registered">Recently Registered</TabsTrigger>
            <TabsTrigger value="accidents">Accident History</TabsTrigger>
            <TabsTrigger value="expired">Expired Registration</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Database</CardTitle>
                <CardDescription>Comprehensive database of all registered vehicles in Ghana</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Registration</TableHead>
                      <TableHead>Make/Model</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">GR-{1234 + i}-20</TableCell>
                        <TableCell>Toyota Corolla</TableCell>
                        <TableCell>2020</TableCell>
                        <TableCell>John Doe</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        </TableCell>
                        <TableCell>2023-09-{10 + i}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="registered" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recently Registered Vehicles</CardTitle>
                <CardDescription>Vehicles registered in the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Registration</TableHead>
                      <TableHead>Make/Model</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Registration Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: 3 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">GR-{5678 + i}-23</TableCell>
                        <TableCell>Honda Civic</TableCell>
                        <TableCell>2023</TableCell>
                        <TableCell>Jane Smith</TableCell>
                        <TableCell>2023-10-{25 + i}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accidents" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Vehicles with Accident History</CardTitle>
                <CardDescription>Vehicles involved in reported accidents</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Registration</TableHead>
                      <TableHead>Make/Model</TableHead>
                      <TableHead>Accident Count</TableHead>
                      <TableHead>Last Accident</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: 3 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">GR-{3456 + i}-19</TableCell>
                        <TableCell>Nissan Altima</TableCell>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>2023-08-{15 + i}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
                            Minor
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View History
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expired" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Vehicles with Expired Registration</CardTitle>
                <CardDescription>Vehicles with expired registration that need renewal</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Registration</TableHead>
                      <TableHead>Make/Model</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Days Expired</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: 3 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">GR-{7890 + i}-18</TableCell>
                        <TableCell>Ford Focus</TableCell>
                        <TableCell>Michael Johnson</TableCell>
                        <TableCell>2023-09-{10 + i}</TableCell>
                        <TableCell>{30 + i * 5}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Renew
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

