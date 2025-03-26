/**
 * Search Records Component
 *
 * This component provides a unified search interface for finding accident reports,
 * vehicles, drivers, and claims across the system.
 *
 * @component
 * @returns {JSX.Element} The search records component
 */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, Car, User } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { usePermissions } from "@/hooks/use-permissions"

export function SearchRecords() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("accident")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const { user } = useAuth()
  const { hasPermission } = usePermissions()

  // Mock search function - would be replaced with actual API call
  const handleSearch = () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)

    // Simulate API call
    setTimeout(() => {
      // Mock results based on search type
      let results = []

      if (searchType === "accident") {
        results = [
          {
            id: "ACC-2023-001",
            date: "2023-06-15",
            location: "Accra Central",
            status: "Approved",
            vehicles: 2,
            injuries: 1,
            fatalaties: 0,
          },
          {
            id: "ACC-2023-002",
            date: "2023-06-14",
            location: "Tema Highway",
            status: "Pending",
            vehicles: 3,
            injuries: 2,
            fatalaties: 0,
          },
          {
            id: "ACC-2023-003",
            date: "2023-06-10",
            location: "Kumasi Road",
            status: "Incomplete",
            vehicles: 1,
            injuries: 0,
            fatalaties: 0,
          },
        ]
      } else if (searchType === "vehicle") {
        results = [
          {
            id: "VEH-001",
            make: "Toyota",
            model: "Corolla",
            year: "2019",
            licensePlate: "GR-1234-20",
            owner: "John Doe",
            accidents: 1,
          },
          {
            id: "VEH-002",
            make: "Honda",
            model: "Civic",
            year: "2020",
            licensePlate: "GW-5678-21",
            owner: "Jane Smith",
            accidents: 2,
          },
          {
            id: "VEH-003",
            make: "Hyundai",
            model: "Elantra",
            year: "2018",
            licensePlate: "GE-9012-19",
            owner: "Michael Johnson",
            accidents: 0,
          },
        ]
      } else if (searchType === "driver") {
        results = [
          {
            id: "DRV-001",
            name: "John Doe",
            licenseNumber: "GH-DL-12345",
            expiryDate: "2025-06-15",
            status: "Valid",
            accidents: 1,
            violations: 0,
          },
          {
            id: "DRV-002",
            name: "Jane Smith",
            licenseNumber: "GH-DL-67890",
            expiryDate: "2024-03-22",
            status: "Valid",
            accidents: 2,
            violations: 1,
          },
          {
            id: "DRV-003",
            name: "Michael Johnson",
            licenseNumber: "GH-DL-54321",
            expiryDate: "2023-12-10",
            status: "Expiring Soon",
            accidents: 0,
            violations: 0,
          },
        ]
      } else if (searchType === "claim") {
        results = [
          {
            id: "CLM-2023-001",
            accidentId: "ACC-2023-001",
            claimant: "John Doe",
            insuranceCompany: "Ghana Insurance Ltd",
            status: "Approved",
            amount: "GHS 5,000",
            date: "2023-06-20",
          },
          {
            id: "CLM-2023-002",
            accidentId: "ACC-2023-002",
            claimant: "Jane Smith",
            insuranceCompany: "Accra Insurance Co",
            status: "Pending",
            amount: "GHS 12,500",
            date: "2023-06-18",
          },
          {
            id: "CLM-2023-003",
            accidentId: "ACC-2023-001",
            claimant: "Michael Johnson",
            insuranceCompany: "Ghana Insurance Ltd",
            status: "Rejected",
            amount: "GHS 8,000",
            date: "2023-06-22",
          },
        ]
      }

      setSearchResults(results)
      setIsSearching(false)
    }, 1000)
  }

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Search Records</h1>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search</CardTitle>
          <CardDescription>Search for accident reports, vehicles, drivers, or claims</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch()
                    }
                  }}
                />
              </div>
            </div>
            <div className="w-full md:w-[200px]">
              <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger>
                  <SelectValue placeholder="Search type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="accident">Accident Reports</SelectItem>
                  <SelectItem value="vehicle">Vehicles</SelectItem>
                  <SelectItem value="driver">Drivers</SelectItem>
                  {hasPermission("read:claim") && <SelectItem value="claim">Claims</SelectItem>}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="results" className="space-y-4">
        <TabsList>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="recent">Recent Searches</TabsTrigger>
        </TabsList>
        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Search Results</CardTitle>
              <CardDescription>
                {searchResults.length > 0
                  ? `Found ${searchResults.length} results for "${searchQuery}"`
                  : "Enter a search term to find records"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {searchResults.length > 0 ? (
                searchType === "accident" ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Vehicles</TableHead>
                        <TableHead>Injuries</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {searchResults.map((result) => (
                        <TableRow key={result.id}>
                          <TableCell className="font-medium">{result.id}</TableCell>
                          <TableCell>{result.date}</TableCell>
                          <TableCell>{result.location}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                result.status === "Approved"
                                  ? "default"
                                  : result.status === "Pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {result.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{result.vehicles}</TableCell>
                          <TableCell>{result.injuries}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline" asChild>
                              <a href={`/reports/${result.id}`}>View</a>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : searchType === "vehicle" ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vehicle ID</TableHead>
                        <TableHead>Make/Model</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>License Plate</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Accidents</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {searchResults.map((result) => (
                        <TableRow key={result.id}>
                          <TableCell className="font-medium">{result.id}</TableCell>
                          <TableCell>
                            {result.make} {result.model}
                          </TableCell>
                          <TableCell>{result.year}</TableCell>
                          <TableCell>{result.licensePlate}</TableCell>
                          <TableCell>{result.owner}</TableCell>
                          <TableCell>{result.accidents}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline" asChild>
                              <a href={`/vehicles/${result.id}`}>View</a>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : searchType === "driver" ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Driver ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>License Number</TableHead>
                        <TableHead>Expiry Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Accidents</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {searchResults.map((result) => (
                        <TableRow key={result.id}>
                          <TableCell className="font-medium">{result.id}</TableCell>
                          <TableCell>{result.name}</TableCell>
                          <TableCell>{result.licenseNumber}</TableCell>
                          <TableCell>{result.expiryDate}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                result.status === "Valid"
                                  ? "default"
                                  : result.status === "Expiring Soon"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {result.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{result.accidents}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline" asChild>
                              <a href={`/drivers/${result.id}`}>View</a>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Claim ID</TableHead>
                        <TableHead>Accident ID</TableHead>
                        <TableHead>Claimant</TableHead>
                        <TableHead>Insurance</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {searchResults.map((result) => (
                        <TableRow key={result.id}>
                          <TableCell className="font-medium">{result.id}</TableCell>
                          <TableCell>{result.accidentId}</TableCell>
                          <TableCell>{result.claimant}</TableCell>
                          <TableCell>{result.insuranceCompany}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                result.status === "Approved"
                                  ? "default"
                                  : result.status === "Pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {result.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{result.amount}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline" asChild>
                              <a href={`/claims/${result.id}`}>View</a>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No results found</h3>
                  <p className="text-sm text-muted-foreground mt-1">Try adjusting your search term or search type</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Searches</CardTitle>
              <CardDescription>Your recent search history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Accident Reports</p>
                      <p className="text-sm text-muted-foreground">"ACC-2023" • 2 hours ago</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSearchType("accident")
                      setSearchQuery("ACC-2023")
                      handleSearch()
                    }}
                  >
                    Search Again
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Car className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Vehicles</p>
                      <p className="text-sm text-muted-foreground">"Toyota" • 1 day ago</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSearchType("vehicle")
                      setSearchQuery("Toyota")
                      handleSearch()
                    }}
                  >
                    Search Again
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Drivers</p>
                      <p className="text-sm text-muted-foreground">"John" • 3 days ago</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSearchType("driver")
                      setSearchQuery("John")
                      handleSearch()
                    }}
                  >
                    Search Again
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Clear Search History
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

