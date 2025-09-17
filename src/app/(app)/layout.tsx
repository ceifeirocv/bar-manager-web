import React from "react";
import { requireAuth } from "../actions/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth();
  return <>{children}</>;
}
