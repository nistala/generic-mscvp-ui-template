"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, UserPlus, Search } from "lucide-react"

export function UserManagementScreen() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-[#0d416b] flex items-center">
            <Users className="h-5 w-5 mr-2" />
            User Management
          </CardTitle>
          <CardDescription>Manage users, roles, and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-[#00aae7]">
              <CardHeader>
                <CardTitle className="text-lg text-[#0d416b] flex items-center">
                  <UserPlus className="h-5 w-5 mr-2" />
                  User Creation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#b7b2b3] mb-4">Create new user accounts and assign roles</p>
                <Button className="bg-[#00aae7] hover:bg-[#0d416b]">Create New User</Button>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="text-lg text-[#0d416b] flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  User Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#b7b2b3] mb-4">Search and manage existing users</p>
                <Input placeholder="Search users..." className="border-[#b7b2b3]/30 focus:border-[#00aae7]" />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
