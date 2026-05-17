export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export type EventItem = {
  id: number;
  title: string;
  description?: string;
  date: string;
  time?: string;
  category?: string;
  imageUrl?: string;
  featured?: boolean;
};

export type MenuItem = {
  id: number;
  name: string;
  category?: string;
  price?: number;
  description?: string;
  imageUrl?: string;
};

export type Beer = {
  id: number;
  name: string;
  type?: string;
  price?: number;
  description?: string;
};

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers
    },
    next: { revalidate: 30 }
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
