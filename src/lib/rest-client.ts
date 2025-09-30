// lib/rest-client.ts
import { cookies } from "next/headers";

interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}

class RestClient {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;

  constructor() {
    this.baseUrl = process.env.API_URL || "";
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  private async getAuthHeaders(): Promise<HeadersInit> {
    try {
      const cookieStore = await cookies();

      // Get all cookies and format them for the request
      const cookieHeader = cookieStore
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; ");

      return cookieHeader ? { Cookie: cookieHeader } : {};
    } catch (error) {
      // Handle cases where cookies() might not be available
      console.warn("Failed to get cookies:", error);
      return {};
    }
  }

  private buildUrl(
    endpoint: string,
    params?: Record<string, string | number | boolean>
  ): string {
    const url = new URL(endpoint, this.baseUrl);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    return url.toString();
  }

  private async makeRequest<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const { params, ...requestConfig } = config;

    const url = this.buildUrl(endpoint, params);
    const authHeaders = await this.getAuthHeaders();

    const headers: HeadersInit = {
      ...this.defaultHeaders,
      ...authHeaders,
      ...requestConfig.headers,
    };

    try {
      const response = await fetch(url, {
        ...requestConfig,
        headers,
        credentials: "include", // Important for cookies
      });

      const data = await response.json();

      return {
        data,
        status: response.status,
        error: !response.ok ? data.message || "Request failed" : undefined,
      };
    } catch (error) {
      return {
        data: {} as T,
        status: 0,
        error: error instanceof Error ? error.message : "Network error",
      };
    }
  }

  // GET request
  async get<T>(
    endpoint: string,
    params?: Record<string, string | number | boolean>
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: "GET",
      params,
    });
  }

  // POST request
  async post<T>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      ...config,
    });
  }

  // PUT request
  async put<T>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
      ...config,
    });
  }

  // PATCH request
  async patch<T>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
      ...config,
    });
  }

  // DELETE request
  async delete<T>(
    endpoint: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: "DELETE",
      ...config,
    });
  }

  // Upload file
  async upload<T>(
    endpoint: string,
    file: File,
    additionalData?: Record<string, unknown>
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append("file", file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    const authHeaders = await this.getAuthHeaders();

    return this.makeRequest<T>(endpoint, {
      method: "POST",
      body: formData,
      headers: {
        ...authHeaders,
        // Don't set Content-Type for FormData, let browser set it with boundary
      },
    });
  }
}

// Export singleton instance
export const restClient = new RestClient();

// Export the class for custom instances if needed
export { RestClient };
