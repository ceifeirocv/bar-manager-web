import { z } from "zod";

// Type definitions based on API response
export const loginSchema = z.object({
  username: z.string("Username is required").min(1, "Username is required"),
  password: z.string("Password is required").min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export interface Session {
  expiresAt: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  ipAddress: string;
  userAgent: string;
  userId: string;
  id: string;
}

export interface User {
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  username: string;
  displayUsername: string;
  id: string;
}

export interface AuthResponse {
  session: Session;
  user: User;
}
