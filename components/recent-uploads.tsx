import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

/**
 * Recent Uploads Component
 *
 * This component displays a list of recently uploaded evidence for accident reports.
 * Each upload item includes vehicle details, evidence type, and uploading officer.
 *
 * @component
 * @returns {JSX.Element} The recent uploads list UI
 *
 * @backend
 * Required API endpoints:
 * - GET /api/evidence/recent - Fetch recent evidence uploads
 * - GET /api/evidence/:id - Fetch specific evidence details
 */
export function RecentUploads() {
  const uploads = [
    {
      id: "UPL001",
      vehicle: "Toyota Corolla (GR-1234-20)",
      type: "Photos",
      count: 8,
      time: "30 minutes ago",
      officer: "Daniel Mensah",
    },
    {
      id: "UPL002",
      vehicle: "Honda Civic (GW-5678-21)",
      type: "Video",
      count: 2,
      time: "1 hour ago",
      officer: "Sarah Owusu",
    },
    {
      id: "UPL003",
      vehicle: "Hyundai Elantra (GS-9012-19)",
      type: "Photos & Video",
      count: 12,
      time: "2 hours ago",
      officer: "Emmanuel Addo",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Evidence Uploads</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {uploads.map((upload) => (
            <div key={upload.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{upload.vehicle}</p>
                <p className="text-sm text-muted-foreground">
                  {upload.count} {upload.type} • {upload.time} • by {upload.officer}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge>{upload.type}</Badge>
                <Button size="icon" variant="ghost">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

