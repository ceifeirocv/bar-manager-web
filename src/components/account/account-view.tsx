import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { User, Shield, Bell, Star } from "lucide-react";
import { getUser } from "@/app/actions/auth/auth";
import { getInitials } from "@/lib/utils";
import AccountDetailsForm from "./account-details-form";

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
          <AccountDetailsForm user={user} />
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
