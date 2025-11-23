export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function api<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  // Handle error
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(
        err.error || 
        err.message || 
        err.details || 
        "API request failed"
      );
      
  }

  return response.json();
}
