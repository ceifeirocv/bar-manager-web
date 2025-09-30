import { getUser } from "@/app/actions/auth/auth";
import AccountView from "@/components/account/account-view";
import React from "react";

export default async function AccountPage() {
  const user = await getUser();
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 justify-center items-center">
      <AccountView />
    </main>
  );
}
