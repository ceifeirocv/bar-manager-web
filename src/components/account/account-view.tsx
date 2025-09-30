import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { User, Shield, Bell, Star } from "lucide-react";
import { getUser } from "@/app/actions/auth/auth";
import { getInitials } from "@/lib/utils";

export default async function AccountView() {
  const user = await getUser();

  if (!user) {
    return <div>User not found</div>;
  }
  const initials = getInitials(user.name);
  return (
    <div className="max-w-7xl w-full mx-auto">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-8">
        <Avatar className="h-16 w-16 rounded-xl">
          <AvatarImage
            src={user.image || "/avatars/default.jpg"}
            alt={user.name}
          />
          <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-semibold">{user.name}</h1>
          <p className="text-secondary-foreground">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      {/* Account Tabs */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-4 w-full">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          {/* Profile Details Section */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="mb-6">Profile Details</h2>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="firstName" className=" mb-2 block">
                    First name
                  </Label>
                  <Input
                    id="firstName"
                    defaultValue="John"
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className=" mb-2 block">
                    Last name
                  </Label>
                  <Input id="lastName" defaultValue="Doe" className="w-full" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="email" className="mb-2 block">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john@example.com"
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="role" className="mb-2 block">
                    Role
                  </Label>
                  <Input
                    id="role"
                    defaultValue="Product Designer"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-6">Security Settings</h2>
              <p className="text-muted-foreground">
                Security settings content will go here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-6">Notification Preferences</h2>
              <p className="text-muted-foreground">
                Notification settings content will go here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
