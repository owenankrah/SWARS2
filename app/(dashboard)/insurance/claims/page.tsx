"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-context"
import { insuranceClaims } from "@/lib/demo-data"
import { Search, Filter, Plus } from "lucide-react"

export default function InsuranceClaims() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  if (!user) return null

  // Filter claims based on active tab
  const filteredClaims = insuranceClaims
    .filter((claim) => {
      if (activeTab === "all") return true
      return claim.status === activeTab
    })
    .filter(
      (claim) =>
        claim.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        claim.policyHolder.toLowerCase().includes(searchQuery.toLowerCase()) ||
        claim.accidentId.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      paid: "bg-blue-100 text-blue-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const handleViewClaim = (claimId: string) => {
    router.push(`/insurance/claims/${claimId}`)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
    }).format(amount)
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <h1 className="text-lg font-semibold">Claims Management</h1>
        </div>
      </div>

      <div className="flex-1 space-y-4 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Insurance Claims</h2>
            <p className="text-muted-foreground">Manage and process insurance claims for vehicle accidents.</p>
          </div>
          <Button onClick={() => router.push("/insurance/claims/new")}>
            <Plus className="mr-2 h-4 w-4" />
            New Claim
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Claims</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Claims</CardTitle>
                <CardDescription>{filteredClaims.length} claims found</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search claims..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Claim ID</TableHead>
                        <TableHead>Accident ID</TableHead>
                        <TableHead>Policy Holder</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date Filed</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClaims.length > 0 ? (
                        filteredClaims.map((claim) => (
                          <TableRow key={claim.id}>
                            <TableCell className="font-medium">{claim.id}</TableCell>
                            <TableCell>{claim.accidentId}</TableCell>
                            <TableCell>{claim.policyHolder}</TableCell>
                            <TableCell>{formatCurrency(claim.amount)}</TableCell>
                            <TableCell>{claim.dateFiled}</TableCell>
                            <TableCell>
                              <Badge className={getStatusBadge(claim.status)} variant="outline">
                                {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm" onClick={() => handleViewClaim(claim.id)}>
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="h-24 text-center">
                            No claims found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

