"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { useAuth } from "@/lib/auth-context"
import { subrogationClaims, insuranceCompanies } from "@/lib/demo-data"
import { Separator } from "@/components/ui/separator"
import { BarChart, PieChart } from "lucide-react"

export default function SubrogationManagement() {
  const { user } = useAuth()
  const [selectedClaim, setSelectedClaim] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("claims")
  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  if (!user) return null

  const getStatusBadgeColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const handleViewClaim = (claim: any) => {
    if (!isMounted.current) return
    setSelectedClaim(claim)
    setIsViewDialogOpen(true)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
    }).format(amount)
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader title="Subrogation Management" user={user} />

      <div className="flex-1 space-y-4 p-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Claim Subrogation</h2>
          <p className="text-muted-foreground">Manage and monitor subrogation claims between insurance companies.</p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            if (isMounted.current) {
              setActiveTab(value)
            }
          }}
        >
          <TabsList>
            <TabsTrigger value="claims">Subrogation Claims</TabsTrigger>
            <TabsTrigger value="companies">Insurance Companies</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="claims" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Subrogation Claims</CardTitle>
                <CardDescription>View and manage subrogation claims between insurance companies.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Claim ID</TableHead>
                      <TableHead>Accident ID</TableHead>
                      <TableHead>Claiming Company</TableHead>
                      <TableHead>Responding Company</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subrogationClaims.map((claim) => (
                      <TableRow key={claim.id}>
                        <TableCell className="font-medium">{claim.id}</TableCell>
                        <TableCell>{claim.accidentId}</TableCell>
                        <TableCell>{claim.claimingCompany}</TableCell>
                        <TableCell>{claim.respondingCompany}</TableCell>
                        <TableCell>{formatCurrency(claim.amount)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeColor(claim.status)} variant="outline">
                            {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{claim.date}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => handleViewClaim(claim)}>
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

          <TabsContent value="companies" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Insurance Companies</CardTitle>
                <CardDescription>Overview of insurance companies and their subrogation status.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Total Claims</TableHead>
                      <TableHead>Pending Subrogation</TableHead>
                      <TableHead>Total Subrogation Amount</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {insuranceCompanies.map((company) => (
                      <TableRow key={company.id}>
                        <TableCell className="font-medium">{company.name}</TableCell>
                        <TableCell>{company.totalClaims}</TableCell>
                        <TableCell>{company.pendingSubrogation}</TableCell>
                        <TableCell>{formatCurrency(company.totalSubrogationAmount)}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Subrogation Status Distribution</CardTitle>
                  <CardDescription>Distribution of subrogation claims by status.</CardDescription>
                </CardHeader>
                <CardContent className="flex h-[300px] items-center justify-center">
                  <div className="flex flex-col items-center">
                    <PieChart className="h-16 w-16 text-gray-400" />
                    <p className="mt-4 text-sm text-gray-500">Interactive chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subrogation Amounts by Company</CardTitle>
                  <CardDescription>Total subrogation amounts by insurance company.</CardDescription>
                </CardHeader>
                <CardContent className="flex h-[300px] items-center justify-center">
                  <div className="flex flex-col items-center">
                    <BarChart className="h-16 w-16 text-gray-400" />
                    <p className="mt-4 text-sm text-gray-500">Interactive chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Generate Subrogation Reports</CardTitle>
                <CardDescription>Generate detailed reports on subrogation claims.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="bg-gray-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Monthly Subrogation Report</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-gray-500 mb-2">
                        Summary of all subrogation activities for the current month.
                      </p>
                      <Button variant="outline" className="w-full">
                        Generate
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Company-Specific Report</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-gray-500 mb-2">Detailed report for a specific insurance company.</p>
                      <Button variant="outline" className="w-full">
                        Generate
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Quarterly Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-gray-500 mb-2">
                        Quarterly summary of subrogation trends and statistics.
                      </p>
                      <Button variant="outline" className="w-full">
                        Generate
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog
        open={isViewDialogOpen}
        onOpenChange={(open) => {
          if (isMounted.current) {
            setIsViewDialogOpen(open)
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Subrogation Claim Details</DialogTitle>
            <DialogDescription>Detailed information about the selected subrogation claim.</DialogDescription>
          </DialogHeader>
          {selectedClaim && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Claim ID</h4>
                  <p>{selectedClaim.id}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Accident ID</h4>
                  <p>{selectedClaim.accidentId}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Claiming Company</h4>
                  <p>{selectedClaim.claimingCompany}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Responding Company</h4>
                  <p>{selectedClaim.respondingCompany}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Amount</h4>
                  <p>{formatCurrency(selectedClaim.amount)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Status</h4>
                  <Badge className={getStatusBadgeColor(selectedClaim.status)} variant="outline">
                    {selectedClaim.status.charAt(0).toUpperCase() + selectedClaim.status.slice(1)}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Date</h4>
                  <p>{selectedClaim.date}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Fault Percentage</h4>
                  <p>{selectedClaim.faultPercentage}%</p>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium text-gray-500">Description</h4>
                <p className="text-sm">{selectedClaim.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Policy Holder</h4>
                  <p>{selectedClaim.policyHolder}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Policy Number</h4>
                  <p>{selectedClaim.policyNumber}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Responding Policy Holder</h4>
                  <p>{selectedClaim.respondingPolicyHolder}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Responding Policy Number</h4>
                  <p>{selectedClaim.respondingPolicyNumber}</p>
                </div>
              </div>

              {selectedClaim.status === "rejected" && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Rejection Reason</h4>
                  <p className="text-sm text-red-600">{selectedClaim.rejectionReason}</p>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (isMounted.current) {
                      setIsViewDialogOpen(false)
                    }
                  }}
                >
                  Close
                </Button>
                {selectedClaim.status === "pending" && (
                  <>
                    <Button variant="destructive">Reject</Button>
                    <Button>Approve</Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

