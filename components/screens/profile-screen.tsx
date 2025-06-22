"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "lucide-react"

export function ProfileScreen() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-[#0d416b] flex items-center">
            <User className="h-5 w-5 mr-2" />
            User Profile
          </CardTitle>
          <CardDescription>Manage your account information and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="Admin" className="border-[#b7b2b3]/30 focus:border-[#00aae7]" />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="User" className="border-[#b7b2b3]/30 focus:border-[#00aae7]" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="admin@company.com"
                  className="border-[#b7b2b3]/30 focus:border-[#00aae7]"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  defaultValue="+1 (555) 123-4567"
                  className="border-[#b7b2b3]/30 focus:border-[#00aae7]"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button className="bg-[#00aae7] hover:bg-[#0d416b]">Save Changes</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
