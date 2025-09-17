import { logoutAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import React from "react";

export default async function DashboardPage() {
  return (
    <main className="min-h-screen flex flex-col gap-4 items-center justify-center bg-gray-50">
      <h1>DashboardPage</h1>
      <p>Welcome to the dashboard!</p>
      <form action={logoutAction}>
        <Button variant={"destructive"}>Log Out</Button>
      </form>
    </main>
  );
}
