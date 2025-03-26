import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

/**
 * Pending Approvals Component
 *
 * This component displays a list of accident reports pending approval by police officers.
 * Each approval item includes report details, submitting officer, and priority level.
 *
 * @component
 * @returns {JSX.Element} The pending approvals list UI
 *
 * @backend
 * Required API endpoints:
 * - GET /api/accident-reports?status=pending - Fetch reports pending approval
 * - GET /api/accident-reports/:id - Fetch specific report details
 * - PATCH /api/accident-reports/:id/approve - Approve a report
 */
export function PendingApprovals() {
  const approvals = [
    {
      id: "REP001",
      title: "Accident Report #123",
      officer: "Officer John Doe",
      submitted: "1 hour ago",
      priority: "High",
    },
    {
      id: "REP002",
      title: "Accident Report #124",
      officer: "Officer Jane Smith",
      submitted: "2 hours ago",
      priority: "Medium",
    },
    // Add more approvals...
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Approvals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {approvals.map((approval) => (
            <div key={approval.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{approval.title}</p>
                <p className="text-sm text-muted-foreground">
                  Submitted by {approval.officer} • {approval.submitted}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Badge
                  variant={
                    approval.priority === "High"
                      ? "destructive"
                      : approval.priority === "Medium"
                        ? "default"
                        : "secondary"
                  }
                >
                  {approval.priority}
                </Badge>
                <Button size="sm">Review</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

