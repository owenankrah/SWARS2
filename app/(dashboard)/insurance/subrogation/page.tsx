"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { useAuth } from "@/lib/auth-context"
import { subrogationClaims } from "@/lib/demo-data"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, DollarSign, TrendingUp } from "lucide-react"

export default function InsuranceSubrogation() {
  const { user } = useAuth()
  const [selectedClaim, setSelectedClaim] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isNewClaimDialogOpen, setIsNewClaimDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("outgoing")
  const [outgoingClaims, setOutgoingClaims] = useState<any[]>([])
  const [incomingClaims, setIncomingClaims] = useState<any[]>([])
  const [totalOutgoingAmount, setTotalOutgoingAmount] = useState(0)
  const [totalIncomingAmount, setTotalIncomingAmount] = useState(0)
  const [netSubrogationBalance, setNetSubrogationBalance] = useState(0)
  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    if (!user) return

    // Filter claims based on the company
    const companyName = user.organization || "Star Assurance"
    const outgoing = subrogationClaims.filter((claim) => claim.claimingCompany === companyName)
    const incoming = subrogationClaims.filter((claim) => claim.respondingCompany === companyName)

    // Calculate total amounts
    const outgoingAmount = outgoing.reduce((sum, claim) => sum + claim.amount, 0)
    const incomingAmount = incoming.reduce((sum, claim) => sum + claim.amount, 0)
    const balance = outgoingAmount - incomingAmount

    if (isMounted.current) {
      setOutgoingClaims(outgoing)
      setIncomingClaims(incoming)
      setTotalOutgoingAmount(outgoingAmount)
      setTotalIncomingAmount(incomingAmount)
      setNetSubrogationBalance(balance)
    }
  }, [user])

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
        <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Claim Subrogation</h2>
            <p className="text-muted-foreground">Manage your company's subrogation claims and monitor balances.</p>
          </div>
          <Dialog
            open={isNewClaimDialogOpen}
            onOpenChange={(open) => {
              if (isMounted.current) {
                setIsNewClaimDialogOpen(open)
              }
            }}
          >
            <DialogTrigger asChild>
              <Button>Create New Claim</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Subrogation Claim</DialogTitle>
                <DialogDescription>Submit a new subrogation claim against another insurance company.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="accidentId">Accident ID*</Label>
                  <Input id="accidentId" placeholder="e.g. ACC-2023-001" />
                </div>
                <div>
                  <Label htmlFor="respondingCompany">Responding Company*</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enterprise">Enterprise Insurance</SelectItem>
                      <SelectItem value="sic">SIC Insurance</SelectItem>
                      <SelectItem value="phoenix">Phoenix Insurance</SelectItem>
                      <SelectItem value="vanguard">Vanguard Assurance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="amount">Claim Amount (GHS)*</Label>
                  <Input id="amount" type="number" min="0" placeholder="e.g. 5000" />
                </div>
                <div>
                  <Label htmlFor="description">Claim Description*</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the reason for the subrogation claim..."
                    className="min-h-[100px]"
                  />
                </div>
                <div>
                  <Label htmlFor="faultPercentage">Fault Percentage*</Label>
                  <Input id="faultPercentage" type="number" min="0" max="100" placeholder="e.g. 70" />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (isMounted.current) {
                      setIsNewClaimDialogOpen(false)
                    }
                  }}
                >
                  Cancel
                </Button>
                <Button>Submit Claim</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Outgoing Claims</CardTitle>
              <CardDescription>Total amount claimed from other companies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4 text-green-500" />
                  <div className="text-2xl font-bold">{formatCurrency(totalOutgoingAmount)}</div>
                </div>
                <Badge className="bg-green-100 text-green-800">{outgoingClaims.length} claims</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Incoming Claims</CardTitle>
              <CardDescription>Total amount claimed by other companies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4 text-red-500" />
                  <div className="text-2xl font-bold">{formatCurrency(totalIncomingAmount)}</div>
                </div>
                <Badge className="bg-red-100 text-red-800">{incomingClaims.length} claims</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Net Subrogation Balance</CardTitle>
              <CardDescription>Your company's net subrogation position</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp
                  className={`mr-2 h-4 w-4 ${netSubrogationBalance >= 0 ? "text-green-500" : "text-red-500"}`}
                />
                <div className={`text-2xl font-bold ${netSubrogationBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {formatCurrency(Math.abs(netSubrogationBalance))}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {netSubrogationBalance >= 0 ? "Net positive balance" : "Net negative balance"}
              </p>
            </CardContent>
          </Card>
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
            <TabsTrigger value="outgoing">Outgoing Claims</TabsTrigger>
            <TabsTrigger value="incoming">Incoming Claims</TabsTrigger>
            <TabsTrigger value="dashboard">Subrogation Dashboard</TabsTrigger>
          </TabsList>

          <TabsContent value="outgoing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Outgoing Subrogation Claims</CardTitle>
                <CardDescription>Claims your company has filed against other insurance companies.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Claim ID</TableHead>
                      <TableHead>Accident ID</TableHead>
                      <TableHead>Responding Company</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {outgoingClaims.length > 0 ? (
                      outgoingClaims.map((claim) => (
                        <TableRow key={claim.id}>
                          <TableCell className="font-medium">{claim.id}</TableCell>
                          <TableCell>{claim.accidentId}</TableCell>
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
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-muted-foreground">
                          No outgoing claims found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="incoming" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Incoming Subrogation Claims</CardTitle>
                <CardDescription>Claims filed against your company by other insurance companies.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Claim ID</TableHead>
                      <TableHead>Accident ID</TableHead>
                      <TableHead>Claiming Company</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incomingClaims.length > 0 ? (
                      incomingClaims.map((claim) => (
                        <TableRow key={claim.id}>
                          <TableCell className="font-medium">{claim.id}</TableCell>
                          <TableCell>{claim.accidentId}</TableCell>
                          <TableCell>{claim.claimingCompany}</TableCell>
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
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-muted-foreground">
                          No incoming claims found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Subrogation Dashboard</CardTitle>
                <CardDescription>Overview of your company's subrogation performance.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex h-[300px] items-center justify-center">
                  <div className="flex flex-col items-center">
                    <BarChart className="h-16 w-16 text-gray-400" />
                    <p className="mt-4 text-sm text-gray-500">
                      Interactive subrogation trends chart will be displayed here
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Subrogation Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Total Outgoing Claims:</span>
                        <span className="font-medium">{outgoingClaims.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Total Incoming Claims:</span>
                        <span className="font-medium">{incomingClaims.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Pending Outgoing:</span>
                        <span className="font-medium">
                          {outgoingClaims.filter((c) => c.status === "pending").length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Pending Incoming:</span>
                        <span className="font-medium">
                          {incomingClaims.filter((c) => c.status === "pending").length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Approved Outgoing:</span>
                        <span className="font-medium">
                          {outgoingClaims.filter((c) => c.status === "approved").length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Approved Incoming:</span>
                        <span className="font-medium">
                          {incomingClaims.filter((c) => c.status === "approved").length}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Financial Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Total Outgoing Amount:</span>
                        <span className="font-medium">{formatCurrency(totalOutgoingAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Total Incoming Amount:</span>
                        <span className="font-medium">{formatCurrency(totalIncomingAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Pending Outgoing Amount:</span>
                        <span className="font-medium">
                          {formatCurrency(
                            outgoingClaims
                              .filter((c) => c.status === "pending")
                              .reduce((sum, claim) => sum + claim.amount, 0),
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Pending Incoming Amount:</span>
                        <span className="font-medium">
                          {formatCurrency(
                            incomingClaims
                              .filter((c) => c.status === "pending")
                              .reduce((sum, claim) => sum + claim.amount, 0),
                          )}
                        </span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-bold">
                        <span className="text-sm">Net Subrogation Balance:</span>
                        <span className={netSubrogationBalance >= 0 ? "text-green-600" : "text-red-600"}>
                          {formatCurrency(netSubrogationBalance)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Generate Detailed Report</Button>
              </CardFooter>
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
                {selectedClaim.status === "pending" &&
                  selectedClaim.respondingCompany === (user?.organization || "Star Assurance") && (
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

