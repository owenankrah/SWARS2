"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, PaperclipIcon, Search, Send, User } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function MessagesPage() {
  const { user } = useAuth()
  const [selectedConversation, setSelectedConversation] = useState("conv1")
  const [message, setMessage] = useState("")

  const conversations = [
    {
      id: "conv1",
      with: "Sarah Johnson",
      role: "Adjuster",
      company: "Enterprise Insurance",
      lastMessage: "We've reviewed your claim and need additional photos of the vehicle damage.",
      time: "2 hours ago",
      unread: true,
      claimId: "CLM001",
    },
    {
      id: "conv2",
      with: "David Mensah",
      role: "Adjuster",
      company: "Enterprise Insurance",
      lastMessage: "Your claim has been approved. The payment will be processed within 3-5 business days.",
      time: "1 day ago",
      unread: false,
      claimId: "CLM002",
    },
    {
      id: "conv3",
      with: "Grace Owusu",
      role: "Customer Service",
      company: "Enterprise Insurance",
      lastMessage:
        "Thank you for your inquiry about your policy renewal. I've checked your account and can confirm that your policy is set to renew automatically on June 15, 2023.",
      time: "3 days ago",
      unread: false,
      claimId: null,
    },
  ]

  const messages = {
    conv1: [
      {
        sender: "Sarah Johnson",
        time: "May 19, 2023 - 11:45 AM",
        content:
          "Hello! I'm Sarah Johnson, the adjuster assigned to your claim #CLM001. I've reviewed the initial information and would like to discuss a few details with you.",
        isUser: false,
      },
      {
        sender: "You",
        time: "May 19, 2023 - 12:30 PM",
        content: "Hi Sarah, thank you for reaching out. I'm available to discuss the claim. What details do you need?",
        isUser: true,
      },
      {
        sender: "Sarah Johnson",
        time: "May 19, 2023 - 1:15 PM",
        content:
          "We've reviewed your claim and need additional photos of the vehicle damage. Specifically, we need close-up photos of the rear bumper and tail lights, as well as a wide shot showing the entire rear of the vehicle.",
        isUser: false,
      },
      {
        sender: "You",
        time: "May 19, 2023 - 2:30 PM",
        content: "I'll upload the additional photos today. Is there a specific angle you need to see?",
        isUser: true,
      },
      {
        sender: "Sarah Johnson",
        time: "May 19, 2023 - 3:15 PM",
        content:
          "Please include close-up photos of the rear bumper damage and the tail lights. Also, a wide shot showing the entire rear of the vehicle would be helpful. This will help us assess the full extent of the damage.",
        isUser: false,
      },
    ],
    conv2: [
      {
        sender: "David Mensah",
        time: "May 18, 2023 - 9:30 AM",
        content:
          "Good morning! I'm David Mensah, the adjuster handling your claim #CLM002. I've completed my review of your claim.",
        isUser: false,
      },
      {
        sender: "You",
        time: "May 18, 2023 - 10:15 AM",
        content: "Good morning David. Thank you for the update. What's the status of my claim?",
        isUser: true,
      },
      {
        sender: "David Mensah",
        time: "May 18, 2023 - 11:00 AM",
        content:
          "I'm pleased to inform you that your claim has been approved. The payment will be processed within 3-5 business days. The approved amount is ₵8,750, which will be transferred to your registered bank account.",
        isUser: false,
      },
      {
        sender: "You",
        time: "May 18, 2023 - 11:30 AM",
        content:
          "That's great news! Thank you for the quick processing. Will I receive a notification when the payment is made?",
        isUser: true,
      },
      {
        sender: "David Mensah",
        time: "May 18, 2023 - 12:15 PM",
        content:
          "Yes, you will receive an email and SMS notification when the payment is processed. You can also check the status in your account. If you have any other questions, feel free to ask.",
        isUser: false,
      },
    ],
    conv3: [
      {
        sender: "You",
        time: "May 16, 2023 - 2:00 PM",
        content:
          "Hello, I have a question about my policy renewal. My current policy expires next month, and I want to know if it will renew automatically or if I need to take any action.",
        isUser: true,
      },
      {
        sender: "Grace Owusu",
        time: "May 16, 2023 - 3:30 PM",
        content:
          "Hello! Thank you for your inquiry about your policy renewal. I'll check your account and get back to you shortly.",
        isUser: false,
      },
      {
        sender: "Grace Owusu",
        time: "May 16, 2023 - 4:15 PM",
        content:
          "I've checked your account and can confirm that your policy is set to renew automatically on June 15, 2023. The premium will remain the same at ₵1,250 for the year. The payment will be charged to your registered payment method.",
        isUser: false,
      },
      {
        sender: "You",
        time: "May 16, 2023 - 5:00 PM",
        content: "Thank you for the information. Will I receive any documentation for the renewal?",
        isUser: true,
      },
      {
        sender: "Grace Owusu",
        time: "May 16, 2023 - 5:45 PM",
        content:
          "Yes, you will receive a renewal notice by email about 2 weeks before the renewal date. The notice will include the policy details and any changes to the terms and conditions. You can also download the documents from your account once the policy is renewed.",
        isUser: false,
      },
    ],
  }

  const selectedMessages = messages[selectedConversation as keyof typeof messages] || []
  const selectedConversationData = conversations.find((conv) => conv.id === selectedConversation)

  const sendMessage = () => {
    if (message.trim() !== "") {
      // This would be an API call in a real application
      // For demo purposes, we'll just clear the message
      setMessage("")
    }
  }

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        <Card className="md:col-span-1 flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle>Conversations</CardTitle>
            <CardDescription>Your message history with adjusters</CardDescription>
            <div className="relative mt-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-8" />
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <div className="space-y-2">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`p-3 rounded-lg cursor-pointer ${
                    selectedConversation === conv.id ? "bg-primary/10" : "hover:bg-muted"
                  }`}
                  onClick={() => setSelectedConversation(conv.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{conv.with}</p>
                        <div className="flex items-center">
                          {conv.unread && <Badge className="mr-2 h-2 w-2 rounded-full p-0" />}
                          <p className="text-xs text-muted-foreground">{conv.time}</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {conv.role} • {conv.company}
                      </p>
                      {conv.claimId && <p className="text-xs text-muted-foreground">Claim #{conv.claimId}</p>}
                      <p className="text-sm truncate mt-1">{conv.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 flex flex-col">
          {selectedConversationData ? (
            <>
              <CardHeader className="pb-2 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedConversationData.with}</CardTitle>
                    <CardDescription>
                      {selectedConversationData.role} • {selectedConversationData.company}
                      {selectedConversationData.claimId && <> • Claim #{selectedConversationData.claimId}</>}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Start Call
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto p-4">
                <div className="space-y-4">
                  {selectedMessages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          msg.isUser ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <p
                            className={`text-xs font-medium ${msg.isUser ? "text-primary-foreground" : "text-foreground"}`}
                          >
                            {msg.sender}
                          </p>
                          <p
                            className={`text-xs ${msg.isUser ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                          >
                            {msg.time}
                          </p>
                        </div>
                        <p className={`text-sm ${msg.isUser ? "text-primary-foreground" : "text-foreground"}`}>
                          {msg.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Type your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 min-h-[60px]"
                  />
                  <div className="flex flex-col gap-2">
                    <Button size="icon" variant="outline">
                      <PaperclipIcon className="h-4 w-4" />
                    </Button>
                    <Button size="icon" onClick={sendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">No conversation selected</h3>
                <p className="text-sm text-muted-foreground">Select a conversation from the list to view messages</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

