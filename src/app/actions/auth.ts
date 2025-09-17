// app/actions/auth.ts
"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

const AUTH_API_URL = process.env.AUTH_API_URL || "http://localhost:3001";

// Type definitions based on API response
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

// Helper function to parse Set-Cookie header
function parseSetCookieHeader(setCookieHeader: string) {
  const cookies = setCookieHeader.split(",").map((cookie) => cookie.trim());
  const parsedCookies: Array<{
    name: string;
    value: string;
    options: Record<string, string>;
  }> = [];

  cookies.forEach((cookie) => {
    const parts = cookie.split(";").map((part) => part.trim());
    const [nameValue] = parts;
    const [name, value] = nameValue.split("=");

    const options: Record<string, string> = {};
    parts.slice(1).forEach((part) => {
      const [key, val] = part.split("=");
      options[key.toLowerCase()] = val || "true";
    });

    parsedCookies.push({ name, value: decodeURIComponent(value), options });
  });

  return parsedCookies;
}

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Username and password are required" };
  }

  try {
    const response = await fetch(`${AUTH_API_URL}/api/auth/sign-in/username`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { error: error.message || "Login failed" };
    }

    // Set all cookies from the response
    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      const cookieStore = await cookies();
      const parsedCookies = parseSetCookieHeader(setCookieHeader);

      parsedCookies.forEach(({ name, value, options }) => {
        cookieStore.set(name, value, {
          httpOnly: options.httponly === "true",
          secure:
            process.env.NODE_ENV === "production" || options.secure === "true",
          sameSite: (options.samesite as any) || "lax",
          path: options.path || "/",
          maxAge: options["max-age"] ? parseInt(options["max-age"]) : undefined,
        });
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    return { error: "An unexpected error occurred" };
  }

  redirect("/dashboard");
}

export async function logoutAction() {
  const cookieStore = await cookies();

  try {
    await fetch(`${AUTH_API_URL}/api/auth/sign-out`, {
      method: "POST",
      headers: {
        cookie: cookieStore.toString(),
      },
    });
  } catch (error) {
    console.error("Logout error:", error);
  }

  // Clear all better-auth related cookies
  const allCookies = cookieStore.getAll();
  allCookies.forEach((cookie) => {
    if (cookie.name.startsWith("better-auth")) {
      cookieStore.set(cookie.name, "", {
        maxAge: 0,
        path: "/",
      });
    }
  });

  revalidateTag("session");

  redirect("/");
}

// Complete the signup action
export async function signupAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const response = await fetch(`${AUTH_API_URL}/api/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { error: error.message || "Signup failed" };
    }

    // Handle cookies same as login
    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      const cookieStore = await cookies();
      const parsedCookies = parseSetCookieHeader(setCookieHeader);

      parsedCookies.forEach(({ name, value, options }) => {
        cookieStore.set(name, value, {
          httpOnly: options.httponly === "true",
          secure:
            process.env.NODE_ENV === "production" || options.secure === "true",
          sameSite: (options.samesite as any) || "lax",
          path: options.path || "/",
          maxAge: options["max-age"] ? parseInt(options["max-age"]) : undefined,
        });
      });
    }
  } catch (error) {
    console.error("Signup error:", error);
    return { error: "An unexpected error occurred" };
  }

  redirect("/dashboard");
}

export async function getServerSession(): Promise<AuthResponse | null> {
  const cookieStore = await cookies();

  try {
    const response = await fetch(`${AUTH_API_URL}/api/auth/get-session`, {
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "force-cache",
      next: { revalidate: 30, tags: ["session"] }, // Important for server components
    });

    console.log({ response });

    if (response.ok) {
      const session: AuthResponse = await response.json();
      return session?.session ? session : null;
    }
  } catch (error) {
    console.error("Failed to get session:", error);
  }

  return null;
}

export async function requireAuth(): Promise<AuthResponse> {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return session;
}

export async function getUser(): Promise<User | null> {
  const session = await getServerSession();
  return session?.user || null;
}
