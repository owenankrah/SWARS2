"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle, HelpCircle, Info, Star } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function InsuranceRatingPage() {
  const { user } = useAuth()

  const ratingFactors = [
    {
      name: "Driver Experience",
      score: 9,
      maxScore: 10,
      description: "Based on years of driving and license history",
      tips: "Maintain your clean driving record to keep this score high.",
    },
    {
      name: "Claims History",
      score: 8,
      maxScore: 10,
      description: "Based on frequency and severity of past claims",
      tips: "Avoid filing small claims that you can cover out of pocket.",
    },
    {
      name: "Vehicle Safety",
      score: 9.5,
      maxScore: 10,
      description: "Based on vehicle safety features and ratings",
      tips: "Keep your vehicle maintained and consider safety features when purchasing a new vehicle.",
    },
    {
      name: "Payment History",
      score: 10,
      maxScore: 10,
      description: "Based on timely premium payments",
      tips: "Continue making payments on time to maintain this perfect score.",
    },
    {
      name: "Driving Behavior",
      score: 8.5,
      maxScore: 10,
      description: "Based on driving habits and behavior",
      tips: "Avoid speeding and practice defensive driving techniques.",
    },
  ]

  const overallRating = 4.8

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Insurance Rating</h1>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall Rating</CardTitle>
            <CardDescription>Your insurance rating affects your premium costs</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative w-48 h-48 mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-5xl font-bold">{overallRating}</div>
                <div className="text-xl">/5.0</div>
              </div>
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="10"
                  strokeDasharray="282.7"
                  strokeDashoffset={282.7 - 282.7 * (overallRating / 5)}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
            </div>
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 ${
                    star <= Math.floor(overallRating)
                      ? "text-yellow-500 fill-yellow-500"
                      : star <= overallRating
                        ? "text-yellow-500 fill-yellow-500 opacity-50"
                        : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <p className="text-center text-muted-foreground">Excellent rating! You're among our top-rated drivers.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rating Benefits</CardTitle>
            <CardDescription>Benefits you receive based on your rating</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Premium Discount</p>
                  <p className="text-sm text-muted-foreground">
                    You qualify for a 15% discount on your premium based on your excellent rating.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Accident Forgiveness</p>
                  <p className="text-sm text-muted-foreground">
                    Your first at-fault accident won't increase your premium.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Priority Claims Processing</p>
                  <p className="text-sm text-muted-foreground">Your claims are processed with priority status.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Lower Deductible</p>
                  <p className="text-sm text-muted-foreground">
                    You qualify for a reduced deductible on comprehensive and collision coverage.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rating Factors</CardTitle>
          <CardDescription>Factors that contribute to your insurance rating</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="factors" className="space-y-4">
            <TabsList>
              <TabsTrigger value="factors">Rating Factors</TabsTrigger>
              <TabsTrigger value="history">Rating History</TabsTrigger>
              <TabsTrigger value="tips">Improvement Tips</TabsTrigger>
            </TabsList>

            <TabsContent value="factors" className="space-y-6">
              {ratingFactors.map((factor, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{factor.name}</p>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="font-medium">
                      {factor.score}/{factor.maxScore}
                    </p>
                  </div>
                  <Progress value={(factor.score / factor.maxScore) * 100} className="h-2" />
                  <p className="text-sm text-muted-foreground">{factor.description}</p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-24 text-center">
                    <p className="font-medium">May 2023</p>
                    <div className="flex items-center justify-center mt-1">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1">4.8</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <Progress value={96} className="h-2" />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-center">
                    <p className="font-medium">Apr 2023</p>
                    <div className="flex items-center justify-center mt-1">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1">4.7</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <Progress value={94} className="h-2" />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-center">
                    <p className="font-medium">Mar 2023</p>
                    <div className="flex items-center justify-center mt-1">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1">4.7</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <Progress value={94} className="h-2" />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-center">
                    <p className="font-medium">Feb 2023</p>
                    <div className="flex items-center justify-center mt-1">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1">4.6</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <Progress value={92} className="h-2" />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-center">
                    <p className="font-medium">Jan 2023</p>
                    <div className="flex items-center justify-center mt-1">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1">4.5</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <Progress value={90} className="h-2" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tips" className="space-y-4">
              <div className="space-y-4">
                {ratingFactors.map((factor, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium">{factor.name}</p>
                      <p className="text-sm text-muted-foreground">{factor.tips}</p>
                    </div>
                  </div>
                ))}
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="font-medium">General Advice</p>
                    <p className="text-sm text-muted-foreground">
                      Always drive safely, maintain your vehicle regularly, and report any changes in your driving
                      habits or vehicle usage to your insurance provider.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

