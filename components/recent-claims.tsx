import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

/**
 * Recent Claims Component
 *
 * This component displays a list of recently submitted insurance claims.
 * Each claim item includes policyholder details, amount, and status.
 *
 * @component
 * @returns {JSX.Element} The recent claims list UI
 *
 * @backend
 * Required API endpoints:
 * - GET /api/claims/recent - Fetch recent claims
 * - GET /api/claims/:id - Fetch specific claim details
 */
export function RecentClaims() {
  const claims = [
    {
      id: "CLM001",
      policyholder: "Kofi Mensah",
      vehicle: "Toyota Corolla (GR-1234-20)",
      amount: "₵12,500",
      submitted: "2 days ago",
      status: "Pending",
    },
    {
      id: "CLM002",
      policyholder: "Ama Owusu",
      vehicle: "Honda Civic (GW-5678-21)",
      amount: "₵8,750",
      submitted: "3 days ago",
      status: "In Progress",
    },
    {
      id: "CLM003",
      policyholder: "Kwame Addo",
      vehicle: "Hyundai Elantra (GS-9012-19)",
      amount: "₵15,200",
      submitted: "5 days ago",
      status: "Approved",
    },
    {
      id: "CLM004",
      policyholder: "Abena Boateng",
      vehicle: "Nissan Altima (GR-3456-22)",
      amount: "₵6,800",
      submitted: "1 week ago",
      status: "Rejected",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Claims</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {claims.map((claim) => (
            <div key={claim.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{claim.policyholder}</p>
                <p className="text-sm text-muted-foreground">
                  {claim.vehicle} • {claim.amount} • {claim.submitted}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Badge
                  variant={
                    claim.status === "Approved"
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
                <Button size="sm">View</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

