/**
 * Pending Assessments Component
 *
 * This component displays a list of vehicles pending damage assessment by DVLA officers.
 * It allows officers to view details and navigate to the update report page with the vehicle pre-selected.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} The pending assessments component
 *
 * @backend
 * Required API endpoints:
 * - GET /api/dvla/assessments?status=pending - Fetch pending vehicle assessments
 */
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, FileEdit } from "lucide-react"
import Link from "next/link"

// Mock data for pending assessments
const mockPendingAssessments = [
  {
    id: "assessment-1",
    vehicleId: "vehicle-1",
    vehicleMake: "Toyota",
    vehicleModel: "Corolla",
    licensePlate: "GR-1234-20",
    accidentDate: "2023-06-15",
    accidentLocation: "Accra Central",
    priority: "high",
    reportId: "report-123",
  },
  {
    id: "assessment-2",
    vehicleId: "vehicle-2",
    vehicleMake: "Honda",
    vehicleModel: "Civic",
    licensePlate: "GW-5678-21",
    accidentDate: "2023-06-14",
    accidentLocation: "Tema",
    priority: "medium",
    reportId: "report-456",
  },
  {
    id: "assessment-3",
    vehicleId: "vehicle-3",
    vehicleMake: "Hyundai",
    vehicleModel: "Elantra",
    licensePlate: "GE-9012-19",
    accidentDate: "2023-06-13",
    accidentLocation: "Kumasi",
    priority: "low",
    reportId: "report-789",
  },
  {
    id: "assessment-4",
    vehicleId: "vehicle-4",
    vehicleMake: "Nissan",
    vehicleModel: "Altima",
    licensePlate: "GS-3456-22",
    accidentDate: "2023-06-12",
    accidentLocation: "Cape Coast",
    priority: "high",
    reportId: "report-012",
  },
  {
    id: "assessment-5",
    vehicleId: "vehicle-5",
    vehicleMake: "Ford",
    vehicleModel: "Focus",
    licensePlate: "GT-7890-20",
    accidentDate: "2023-06-11",
    accidentLocation: "Tamale",
    priority: "medium",
    reportId: "report-345",
  },
]

interface PendingAssessmentsProps {
  className?: string
}

export function PendingAssessments({ className }: PendingAssessmentsProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Pending Vehicle Assessments</CardTitle>
        <CardDescription>Vehicles requiring damage assessment following accidents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockPendingAssessments.map((assessment) => (
            <div key={assessment.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-start gap-4">
                <div className="bg-muted rounded-md p-2">
                  <Car className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">
                      {assessment.vehicleMake} {assessment.vehicleModel}
                    </h3>
                    <Badge
                      variant={
                        assessment.priority === "high"
                          ? "destructive"
                          : assessment.priority === "medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {assessment.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {assessment.licensePlate} • Accident on {assessment.accidentDate}
                  </p>
                  <p className="text-sm text-muted-foreground">Location: {assessment.accidentLocation}</p>
                </div>
              </div>
              <Button asChild>
                <Link href={`/dvla/update-report?reportId=${assessment.reportId}&vehicleId=${assessment.vehicleId}`}>
                  <FileEdit className="h-4 w-4 mr-2" />
                  Assess
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

