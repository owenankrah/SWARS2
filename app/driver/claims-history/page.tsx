"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Eye, FileText, Filter, Search, SlidersHorizontal } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function ClaimsHistoryPage() {
  const { user } = useAuth()
  const [selectedClaim, setSelectedClaim] = useState<string | null>(null)

  const claims = [
    {
      id: "CLM001",
      vehicle: "Toyota Corolla (GR-1234-20)",
      accidentDate: "2023-05-15",
      amount: "₵12,500",
      status: "In Progress",
      accidentId: "ACC-5678",
    },
    {
      id: "CLM002",
      vehicle: "Honda Civic (GW-5678-21)",
      accidentDate: "2023-03-10",
      amount: "₵8,750",
      status: "Approved",
      accidentId: "ACC-3456",
    },
    {
      id: "CLM003",
      vehicle: "Toyota Corolla (GR-1234-20)",
      accidentDate: "2022-11-22",
      amount: "₵5,200",
      status: "Paid",
      accidentId: "ACC-2345",
    },
    {
      id: "CLM004",
      vehicle: "Honda Civic (GW-5678-21)",
      accidentDate: "2022-08-05",
      amount: "₵3,800",
      status: "Rejected",
      accidentId: "ACC-1234",
    },
  ]

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Claims History</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search claims..." className="pl-8" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Sort
        </Button>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Claims</CardTitle>
          <CardDescription>View all your insurance claims</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
              <div>Claim ID</div>
              <div className="col-span-2">Vehicle</div>
              <div>Date</div>
              <div>Amount</div>
              <div>Status</div>
            </div>
            {claims.map((claim) => (
              <div
                key={claim.id}
                className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-muted/50 cursor-pointer"
                onClick={() => setSelectedClaim(claim.id)}
              >
                <div className="font-medium">{claim.id}</div>
                <div className="col-span-2">
                  <div>{claim.vehicle}</div>
                  <div className="text-sm text-muted-foreground">Accident ID: {claim.accidentId}</div>
                </div>
                <div>{claim.accidentDate}</div>
                <div>{claim.amount}</div>
                <div>
                  <Badge
                    variant={
                      claim.status === "Approved" || claim.status === "Paid"
                        ? "success"
                        : claim.status === "Rejected"
                          ? "destructive"
                          : claim.status === "In Progress"
                            ? "default"
                            : "secondary"
                    }
                  >
                    {claim.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedClaim} onOpenChange={(open) => !open && setSelectedClaim(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Claim Details - {selectedClaim}</DialogTitle>
            <DialogDescription>View detailed information about your claim</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Accident Information</h3>
                <div className="border rounded-md p-3">
                  <p className="font-medium">Accident #: ACC-5678</p>
                  <p className="text-sm text-muted-foreground">Date: May 15, 2023</p>
                  <p className="text-sm text-muted-foreground">Location: Accra Ring Road</p>
                  <p className="text-sm text-muted-foreground">Severity: Moderate</p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="h-3 w-3" />
                      View Accident Report
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Vehicle Information</h3>
                <div className="border rounded-md p-3">
                  <p className="font-medium">Toyota Corolla</p>
                  <p className="text-sm text-muted-foreground">Registration: GR-1234-20</p>
                  <p className="text-sm text-muted-foreground">Year: 2020</p>
                  <p className="text-sm text-muted-foreground">Policy #: ENT-12345</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Damage Assessment</h3>
                <div className="border rounded-md p-3">
                  <p className="text-sm text-muted-foreground">DVLA Assessment:</p>
                  <p className="text-sm">Moderate damage to rear bumper, tail lights, and trunk.</p>
                  <p className="text-sm text-muted-foreground mt-2">Repair Estimate:</p>
                  <p className="text-sm">₵10,800</p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <FileText className="h-3 w-3" />
                      View Evidence
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Claim Details</h3>
                <div className="border rounded-md p-3">
                  <div className="grid grid-cols-2 gap-2">
                    <p className="text-sm text-muted-foreground">Claim Amount:</p>
                    <p className="text-sm font-medium">₵12,500</p>
                    <p className="text-sm text-muted-foreground">Submitted:</p>
                    <p className="text-sm">May 17, 2023</p>
                    <p className="text-sm text-muted-foreground">Status:</p>
                    <Badge>In Progress</Badge>
                    <p className="text-sm text-muted-foreground">Assigned To:</p>
                    <p className="text-sm">Sarah Johnson (Adjuster)</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Claim Timeline</h3>
                <div className="border rounded-md p-3 space-y-3">
                  <div className="border-l-2 border-primary pl-3 pb-3">
                    <p className="text-xs text-muted-foreground">May 17, 2023 - 10:30 AM</p>
                    <p className="text-sm font-medium">Claim Submitted</p>
                    <p className="text-sm">Initial claim submitted for processing.</p>
                  </div>
                  <div className="border-l-2 border-primary pl-3 pb-3">
                    <p className="text-xs text-muted-foreground">May 18, 2023 - 2:15 PM</p>
                    <p className="text-sm font-medium">Claim Assigned</p>
                    <p className="text-sm">Claim assigned to Sarah Johnson for review.</p>
                  </div>
                  <div className="border-l-2 border-primary pl-3">
                    <p className="text-xs text-muted-foreground">May 19, 2023 - 11:45 AM</p>
                    <p className="text-sm font-medium">Additional Information Requested</p>
                    <p className="text-sm">Adjuster has requested additional photos of the vehicle damage.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Messages</h3>
                <div className="border rounded-md p-3 space-y-3">
                  <div className="p-2 bg-muted/50 rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-medium">Sarah Johnson (Adjuster)</p>
                      <p className="text-xs text-muted-foreground">May 19, 2023</p>
                    </div>
                    <p className="text-sm">
                      We've reviewed your claim and need additional photos of the vehicle damage. Please upload them at
                      your earliest convenience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

