"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, Calendar, CreditCard, Download, FileText, Info } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function PremiumPage() {
  const { user } = useAuth()

  const premiumData = {
    annual: 1250,
    monthly: 104.17,
    nextPayment: "15/06/2023",
    paymentMethod: "Credit Card (****1234)",
    autoRenewal: true,
    policyNumber: "ENT-12345",
    startDate: "15/06/2022",
    endDate: "14/06/2023",
    paymentHistory: [
      {
        date: "15/05/2023",
        amount: "₵104.17",
        status: "Paid",
        method: "Credit Card (****1234)",
      },
      {
        date: "15/04/2023",
        amount: "₵104.17",
        status: "Paid",
        method: "Credit Card (****1234)",
      },
      {
        date: "15/03/2023",
        amount: "₵104.17",
        status: "Paid",
        method: "Credit Card (****1234)",
      },
      {
        date: "15/02/2023",
        amount: "₵104.17",
        status: "Paid",
        method: "Credit Card (****1234)",
      },
      {
        date: "15/01/2023",
        amount: "₵104.17",
        status: "Paid",
        method: "Credit Card (****1234)",
      },
    ],
  }

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Premium & Payments</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Annual Premium</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₵{premiumData.annual}</div>
            <p className="text-xs text-muted-foreground">For all vehicles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₵{premiumData.monthly}</div>
            <p className="text-xs text-muted-foreground">Due on the 15th of each month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{premiumData.nextPayment}</div>
            <p className="text-xs text-muted-foreground">Via {premiumData.paymentMethod}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Policy Information</CardTitle>
            <CardDescription>Details about your insurance policy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Policy Number</p>
                  <p className="font-medium">{premiumData.policyNumber}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p>{premiumData.startDate}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">End Date</p>
                  <p>{premiumData.endDate}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <p>{premiumData.paymentMethod}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Auto-Renewal</p>
                  <p>{premiumData.autoRenewal ? "Enabled" : "Disabled"}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <Info className="h-5 w-5 text-blue-500" />
                <p className="text-sm text-blue-700">
                  Your policy will automatically renew on {premiumData.endDate}. The new premium will be ₵
                  {premiumData.annual} for the next year.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" className="gap-2">
              <FileText className="h-4 w-4" />
              View Policy Document
            </Button>
            <Button variant="outline" className="gap-2">
              <CreditCard className="h-4 w-4" />
              Update Payment Method
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Policy Timeline</CardTitle>
            <CardDescription>Your policy period progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Start Date</span>
                  <span>End Date</span>
                </div>
                <Progress value={75} className="h-2" />
                <div className="flex items-center justify-between text-sm">
                  <span>{premiumData.startDate}</span>
                  <span>{premiumData.endDate}</span>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Policy Progress</p>
                  <p className="text-sm">75% Complete</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Policy Started</p>
                      <p className="text-xs text-muted-foreground">{premiumData.startDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      <AlertCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Renewal Notice</p>
                      <p className="text-xs text-muted-foreground">Expected on 31/05/2023</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Policy Renewal</p>
                      <p className="text-xs text-muted-foreground">{premiumData.endDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>Record of your premium payments</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="history" className="space-y-4">
            <TabsList>
              <TabsTrigger value="history">Payment History</TabsTrigger>
              <TabsTrigger value="schedule">Payment Schedule</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
            </TabsList>

            <TabsContent value="history">
              <div className="rounded-md border">
                <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                  <div>Date</div>
                  <div>Amount</div>
                  <div>Method</div>
                  <div>Status</div>
                </div>
                {premiumData.paymentHistory.map((payment, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 p-4 border-b last:border-0">
                    <div>{payment.date}</div>
                    <div>{payment.amount}</div>
                    <div>{payment.method}</div>
                    <div>
                      <Badge variant="success">{payment.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="schedule">
              <div className="rounded-md border">
                <div className="grid grid-cols-3 gap-4 p-4 font-medium border-b">
                  <div>Due Date</div>
                  <div>Amount</div>
                  <div>Status</div>
                </div>
                <div className="grid grid-cols-3 gap-4 p-4 border-b">
                  <div>15/06/2023</div>
                  <div>₵104.17</div>
                  <div>
                    <Badge variant="outline">Upcoming</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 p-4 border-b">
                  <div>15/07/2023</div>
                  <div>₵104.17</div>
                  <div>
                    <Badge variant="outline">Scheduled</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 p-4 border-b">
                  <div>15/08/2023</div>
                  <div>₵104.17</div>
                  <div>
                    <Badge variant="outline">Scheduled</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 p-4 border-b">
                  <div>15/09/2023</div>
                  <div>₵104.17</div>
                  <div>
                    <Badge variant="outline">Scheduled</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 p-4">
                  <div>15/10/2023</div>
                  <div>₵104.17</div>
                  <div>
                    <Badge variant="outline">Scheduled</Badge>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="invoices">
              <div className="rounded-md border">
                <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                  <div>Invoice #</div>
                  <div>Date</div>
                  <div>Amount</div>
                  <div>Actions</div>
                </div>
                {premiumData.paymentHistory.map((payment, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 p-4 border-b last:border-0">
                    <div>INV-{2023050 + index}</div>
                    <div>{payment.date}</div>
                    <div>{payment.amount}</div>
                    <div>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

