// app/login/page.tsx

import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { getServerSession } from "../actions/auth/auth";

export default async function LoginPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/dashboard");
  }

  return <LoginForm />;
}
