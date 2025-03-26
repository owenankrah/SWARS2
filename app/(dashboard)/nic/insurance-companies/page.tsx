/**
 * NIC Insurance Companies Page
 *
 * This component provides an interface for NIC staff to view and manage
 * insurance companies registered in the system, including their compliance
 * status and claim statistics.
 *
 * @component
 * @returns {JSX.Element} The NIC insurance companies page
 */
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download, Plus, Eye } from "lucide-react"

export default function NICInsuranceCompaniesPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader title="Insurance Companies" organization="National Insurance Commission" />

      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4 w-full max-w-sm">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search companies..." className="w-full pl-8" />
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
              Add Company
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Companies</TabsTrigger>
            <TabsTrigger value="compliant">Compliant</TabsTrigger>
            <TabsTrigger value="non-compliant">Non-Compliant</TabsTrigger>
            <TabsTrigger value="pending">Pending Review</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Registered Insurance Companies</CardTitle>
                <CardDescription>
                  All insurance companies registered with the National Insurance Commission
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company Name</TableHead>
                      <TableHead>License Number</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Claims Processed</TableHead>
                      <TableHead>Compliance Status</TableHead>
                      <TableHead>Last Audit</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        name: "Ghana Insurance Ltd",
                        license: "NIC-2023-001",
                        category: "General",
                        claims: 1245,
                        status: "Compliant",
                        audit: "2023-09-15",
                      },
                      {
                        name: "Accra Insurance Co.",
                        license: "NIC-2023-002",
                        category: "Motor",
                        claims: 3567,
                        status: "Compliant",
                        audit: "2023-08-22",
                      },
                      {
                        name: "Kumasi Mutual Insurance",
                        license: "NIC-2023-003",
                        category: "General",
                        claims: 987,
                        status: "Non-Compliant",
                        audit: "2023-07-10",
                      },
                      {
                        name: "Cape Coast Insurance",
                        license: "NIC-2023-004",
                        category: "Life",
                        claims: 456,
                        status: "Pending Review",
                        audit: "2023-10-05",
                      },
                      {
                        name: "Tema Insurance Group",
                        license: "NIC-2023-005",
                        category: "Motor",
                        claims: 2345,
                        status: "Compliant",
                        audit: "2023-09-28",
                      },
                    ].map((company, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{company.name}</TableCell>
                        <TableCell>{company.license}</TableCell>
                        <TableCell>{company.category}</TableCell>
                        <TableCell>{company.claims}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              company.status === "Compliant"
                                ? "bg-green-100 text-green-800"
                                : company.status === "Non-Compliant"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {company.status}
                          </span>
                        </TableCell>
                        <TableCell>{company.audit}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
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

          <TabsContent value="compliant" className="mt-6">
            {/* Similar content as "all" tab but filtered for compliant companies */}
            <Card>
              <CardHeader>
                <CardTitle>Compliant Insurance Companies</CardTitle>
                <CardDescription>Insurance companies that meet all regulatory requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>{/* Table content similar to "all" tab but filtered */}</Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="non-compliant" className="mt-6">
            {/* Similar content as "all" tab but filtered for non-compliant companies */}
            <Card>
              <CardHeader>
                <CardTitle>Non-Compliant Insurance Companies</CardTitle>
                <CardDescription>Insurance companies that have compliance issues to address</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>{/* Table content similar to "all" tab but filtered */}</Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            {/* Similar content as "all" tab but filtered for pending review companies */}
            <Card>
              <CardHeader>
                <CardTitle>Insurance Companies Pending Review</CardTitle>
                <CardDescription>Insurance companies awaiting compliance review</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>{/* Table content similar to "all" tab but filtered */}</Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

