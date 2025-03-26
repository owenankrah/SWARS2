import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

/**
 * Recent Accidents Component
 *
 * This component displays a list of recently reported accidents.
 * Each accident item includes location, time, severity, and status.
 *
 * @component
 * @returns {JSX.Element} The recent accidents list UI
 *
 * @backend
 * Required API endpoints:
 * - GET /api/accidents/recent - Fetch recent accidents
 * - GET /api/accidents/:id - Fetch specific accident details
 */
export function RecentAccidents() {
  const accidents = [
    {
      id: "ACC001",
      location: "Accra Ring Road",
      time: "2 hours ago",
      severity: "Major",
      status: "Pending",
    },
    {
      id: "ACC002",
      location: "Tema Motorway",
      time: "3 hours ago",
      severity: "Minor",
      status: "Processing",
    },
    // Add more accidents...
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Accidents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {accidents.map((accident) => (
            <div key={accident.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{accident.location}</p>
                <p className="text-sm text-muted-foreground">{accident.time}</p>
              </div>
              <div className="flex gap-2">
                <Badge variant={accident.severity === "Major" ? "destructive" : "secondary"}>{accident.severity}</Badge>
                <Badge variant="outline">{accident.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

