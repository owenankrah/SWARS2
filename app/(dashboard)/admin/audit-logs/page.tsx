/**
 * Admin Audit Logs Page
 *
 * This component provides an interface for system administrators to view
 * and filter system audit logs, tracking user actions and system events.
 *
 * @component
 * @returns {JSX.Element} The admin audit logs page
 */
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Download, Calendar } from "lucide-react"

export default function AdminAuditLogsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader title="Audit Logs" organization="System Administration" />

      <div className="container mx-auto py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search logs..." className="w-full pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
              <span className="sr-only">Date Range</span>
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Event Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="login">Login Events</SelectItem>
                <SelectItem value="data">Data Changes</SelectItem>
                <SelectItem value="system">System Events</SelectItem>
                <SelectItem value="security">Security Events</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Logs
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>System Audit Logs</CardTitle>
            <CardDescription>Comprehensive logs of all system activities and user actions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Event Type</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    timestamp: "2023-10-15 14:32:45",
                    eventType: "login",
                    user: "john.doe@police.gov.gh",
                    organization: "Ghana Police Service",
                    ip: "192.168.1.45",
                    description: "User login",
                    status: "Success",
                  },
                  {
                    timestamp: "2023-10-15 14:28:12",
                    eventType: "data",
                    user: "sarah.smith@dvla.gov.gh",
                    organization: "DVLA",
                    ip: "192.168.2.32",
                    description: "Updated vehicle record GR-5678-20",
                    status: "Success",
                  },
                  {
                    timestamp: "2023-10-15 14:15:36",
                    eventType: "security",
                    user: "system",
                    organization: "System",
                    ip: "127.0.0.1",
                    description: "Failed login attempt for user mark.johnson@insurance.com",
                    status: "Failed",
                  },
                  {
                    timestamp: "2023-10-15 13:58:22",
                    eventType: "data",
                    user: "james.brown@police.gov.gh",
                    organization: "Ghana Police Service",
                    ip: "192.168.1.78",
                    description: "Created new accident report #AR-2023-1045",
                    status: "Success",
                  },
                  {
                    timestamp: "2023-10-15 13:45:09",
                    eventType: "system",
                    user: "admin",
                    organization: "System Administration",
                    ip: "192.168.0.1",
                    description: "System backup initiated",
                    status: "Success",
                  },
                  {
                    timestamp: "2023-10-15 13:30:54",
                    eventType: "login",
                    user: "emma.wilson@nic.gov.gh",
                    organization: "NIC",
                    ip: "192.168.3.21",
                    description: "User login",
                    status: "Success",
                  },
                  {
                    timestamp: "2023-10-15 13:22:18",
                    eventType: "data",
                    user: "david.miller@insurance.com",
                    organization: "Insurance Company",
                    ip: "192.168.4.56",
                    description: "Created new claim #CL-2023-0587",
                    status: "Success",
                  },
                  {
                    timestamp: "2023-10-15 13:10:33",
                    eventType: "security",
                    user: "system",
                    organization: "System",
                    ip: "127.0.0.1",
                    description: "Password reset requested for user robert.taylor@dvla.gov.gh",
                    status: "Success",
                  },
                  {
                    timestamp: "2023-10-15 12:58:47",
                    eventType: "system",
                    user: "admin",
                    organization: "System Administration",
                    ip: "192.168.0.1",
                    description: "User account created for lisa.adams@police.gov.gh",
                    status: "Success",
                  },
                  {
                    timestamp: "2023-10-15 12:45:22",
                    eventType: "data",
                    user: "michael.clark@nic.gov.gh",
                    organization: "NIC",
                    ip: "192.168.3.45",
                    description: "Generated monthly accident statistics report",
                    status: "Success",
                  },
                ].map((log, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          log.eventType === "login"
                            ? "bg-blue-100 text-blue-800"
                            : log.eventType === "data"
                              ? "bg-green-100 text-green-800"
                              : log.eventType === "security"
                                ? "bg-red-100 text-red-800"
                                : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {log.eventType.charAt(0).toUpperCase() + log.eventType.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{log.user}</TableCell>
                    <TableCell>{log.organization}</TableCell>
                    <TableCell className="font-mono text-xs">{log.ip}</TableCell>
                    <TableCell>{log.description}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          log.status === "Success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {log.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">Showing 10 of 1,245 entries</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

