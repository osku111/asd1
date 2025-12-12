export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "operator" | "viewer";
}

export const MOCK_USERS: User[] = [
  {
    id: "user-1",
    name: "Admin User",
    email: "admin@trackgps.com",
    avatar: "👤",
    role: "admin",
  },
  {
    id: "user-2",
    name: "John Operator",
    email: "john@trackgps.com",
    avatar: "👨",
    role: "operator",
  },
  {
    id: "user-3",
    name: "Sarah Viewer",
    email: "sarah@trackgps.com",
    avatar: "👩",
    role: "viewer",
  },
  {
    id: "user-4",
    name: "Mike Operator",
    email: "mike@trackgps.com",
    avatar: "👨",
    role: "operator",
  },
];

export function authenticateUser(userId: string): User | null {
  return MOCK_USERS.find((u) => u.id === userId) || null;
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  const userId = localStorage.getItem("currentUserId");
  if (!userId) return null;
  return authenticateUser(userId);
}

export function setCurrentUser(userId: string): void {
  localStorage.setItem("currentUserId", userId);
}

export function logout(): void {
  localStorage.removeItem("currentUserId");
}
