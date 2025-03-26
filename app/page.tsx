"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"

export default function Home() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) {
      router.push(`/dashboard/${user.role}/dashboard`)
    }
  }, [user, isLoading, router])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Single Window Accident Reporting</h1>
          </div>
          <div className="flex items-center gap-2">
            {!user && (
              <Button asChild>
                <a href="/login">Login</a>
              </Button>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ghana's Unified Accident Reporting System
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  A single window system for insurance companies, Ghana's DVLA, the NIC, and the Ghana Police Service.
                </p>
              </div>
              {!user && (
                <div className="space-x-4">
                  <Button asChild>
                    <a href="/login">Get Started</a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Ghana Police Service</CardTitle>
                  <CardDescription>Input, submit, generate and approve reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Create and manage accident reports, approve submissions, and generate official documentation.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <a href="/dashboard/police/dashboard">Police Dashboard</a>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Ghana's DVLA</CardTitle>
                  <CardDescription>Input, upload, and submit functions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Assess vehicle damage, upload evidence, and maintain vehicle records related to accidents.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <a href="/dashboard/dvla/dashboard">DVLA Dashboard</a>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Insurance Companies</CardTitle>
                  <CardDescription>View accident reports and driver history</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Access accident reports, process claims, and review driver history for policy decisions.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <a href="/dashboard/insurance/dashboard">Insurance Dashboard</a>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>NIC</CardTitle>
                  <CardDescription>Report viewing functions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Monitor insurance company activities, ensure compliance, and access accident statistics.</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <a href="/dashboard/nic/dashboard">NIC Dashboard</a>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2023 Single Window Accident Reporting System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

