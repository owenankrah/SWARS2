"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { FileText, MessageSquare, Upload } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function ClaimStatusPage() {
  const { user } = useAuth()
  const [message, setMessage] = useState("")

  const activeClaim = {
    id: "CLM001",
    vehicle: "Toyota Corolla (GR-1234-20)",
    accidentDate: "2023-05-15",
    amount: "₵12,500",
    status: "In Progress",
    accidentId: "ACC-5678",
    progress: 40,
    currentStep: "Review",
    steps: [
      { name: "Submitted", completed: true, date: "May 17, 2023" },
      { name: "Assigned", completed: true, date: "May 18, 2023" },
      { name: "Review", completed: false, date: "In progress" },
      { name: "Decision", completed: false, date: "Pending" },
      { name: "Payment", completed: false, date: "Pending" },
    ],
    messages: [
      {
        sender: "Sarah Johnson (Adjuster)",
        date: "May 19, 2023 - 11:45 AM",
        content:
          "We've reviewed your claim and need additional photos of the vehicle damage. Please upload them at your earliest convenience.",
      },
      {
        sender: "You",
        date: "May 19, 2023 - 2:30 PM",
        content: "I'll upload the additional photos today. Is there a specific angle you need to see?",
      },
      {
        sender: "Sarah Johnson (Adjuster)",
        date: "May 19, 2023 - 3:15 PM",
        content:
          "Please include close-up photos of the rear bumper damage and the tail lights. Also, a wide shot showing the entire rear of the vehicle would be helpful.",
      },
    ],
  }

  const sendMessage = () => {
    if (message.trim() !== "") {
      // This would be an API call in a real application
      // For demo purposes, we'll just clear the message
      setMessage("")
    }
  }

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Claim Status</h1>
        <Badge className="text-base py-1 px-3">{activeClaim.status}</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Claim ID</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{activeClaim.id}</p>
            <p className="text-xs text-muted-foreground">Submitted on May 17, 2023</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Vehicle</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Toyota Corolla</p>
            <p className="text-xs text-muted-foreground">GR-1234-20 • 2020</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Claim Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₵12,500</p>
            <p className="text-xs text-muted-foreground">Repair estimate: ₵10,800</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Claim Progress</CardTitle>
          <CardDescription>
            Current status: <span className="font-medium">{activeClaim.currentStep}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Progress value={activeClaim.progress} className="h-2" />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {activeClaim.steps.map((step, index) => (
              <div key={index} className="text-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    step.completed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                <p className="text-sm font-medium">{step.name}</p>
                <p className="text-xs text-muted-foreground">{step.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="messages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="details">Claim Details</TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Communication with Adjuster</CardTitle>
              <CardDescription>Messages between you and the insurance adjuster</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4 max-h-80 overflow-y-auto p-2">
                {activeClaim.messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${msg.sender === "You" ? "bg-primary/10 ml-12" : "bg-muted mr-12"}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">{msg.sender}</p>
                      <p className="text-xs text-muted-foreground">{msg.date}</p>
                    </div>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Textarea
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <div className="flex flex-col gap-2">
                  <Button size="icon" variant="outline">
                    <Upload className="h-4 w-4" />
                  </Button>
                  <Button size="icon" onClick={sendMessage}>
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Claim Documents</CardTitle>
              <CardDescription>Documents related to your claim</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Accident Report</p>
                      <p className="text-sm text-muted-foreground">PDF • 2.3 MB • Uploaded May 17, 2023</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">DVLA Damage Assessment</p>
                      <p className="text-sm text-muted-foreground">PDF • 1.8 MB • Uploaded May 17, 2023</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Repair Estimate</p>
                      <p className="text-sm text-muted-foreground">PDF • 1.1 MB • Uploaded May 18, 2023</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Photo Evidence</p>
                      <p className="text-sm text-muted-foreground">ZIP • 15.7 MB • Uploaded May 17, 2023</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Claim Information</CardTitle>
              <CardDescription>Complete information about your claim</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Accident Information</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm border rounded-md p-3">
                    <div className="text-muted-foreground">Accident ID:</div>
                    <div>{activeClaim.accidentId}</div>
                    <div className="text-muted-foreground">Date:</div>
                    <div>May 15, 2023</div>
                    <div className="text-muted-foreground">Location:</div>
                    <div>Accra Ring Road, near Danquah Circle</div>
                    <div className="text-muted-foreground">Severity:</div>
                    <div>Moderate - Minor injuries</div>
                    <div className="text-muted-foreground">Police Report:</div>
                    <div>Filed by Officer John Doe (ID: POL-456)</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Vehicle Information</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm border rounded-md p-3">
                    <div className="text-muted-foreground">Registration:</div>
                    <div>GR-1234-20</div>
                    <div className="text-muted-foreground">Make & Model:</div>
                    <div>Toyota Corolla</div>
                    <div className="text-muted-foreground">Year:</div>
                    <div>2020</div>
                    <div className="text-muted-foreground">Insurance Policy:</div>
                    <div>ENT-12345</div>
                    <div className="text-muted-foreground">Damage Description:</div>
                    <div>Rear bumper damage, broken tail lights, and minor trunk damage.</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Claim Information</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm border rounded-md p-3">
                    <div className="text-muted-foreground">Claim ID:</div>
                    <div>{activeClaim.id}</div>
                    <div className="text-muted-foreground">Submission Date:</div>
                    <div>May 17, 2023</div>
                    <div className="text-muted-foreground">Claim Amount:</div>
                    <div>₵12,500</div>
                    <div className="text-muted-foreground">Status:</div>
                    <div>{activeClaim.status}</div>
                    <div className="text-muted-foreground">Assigned Adjuster:</div>
                    <div>Sarah Johnson</div>
                    <div className="text-muted-foreground">Expected Resolution:</div>
                    <div>Within 7-10 business days</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

