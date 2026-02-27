import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  progressPercentage: number;
  lastUnlockedDay: number;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProgress: (day: number) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Admin",
    email: "admin@manuscrito.com",
    isAdmin: true,
    progressPercentage: 100,
    lastUnlockedDay: 12,
    createdAt: "2025-01-01",
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("manuscrito_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email: string, _password: string): Promise<boolean> => {
    const existing = MOCK_USERS.find((u) => u.email === email);
    if (existing) {
      setUser(existing);
      localStorage.setItem("manuscrito_user", JSON.stringify(existing));
      return true;
    }
    // Mock: any email/password combo works
    const newUser: User = {
      id: crypto.randomUUID(),
      name: email.split("@")[0],
      email,
      isAdmin: false,
      progressPercentage: 8,
      lastUnlockedDay: 1,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem("manuscrito_user", JSON.stringify(newUser));
    return true;
  };

  const signup = async (name: string, email: string, _password: string): Promise<boolean> => {
    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      isAdmin: false,
      progressPercentage: 0,
      lastUnlockedDay: 1,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem("manuscrito_user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("manuscrito_user");
  };

  const updateProgress = (day: number) => {
    if (!user) return;
    const updated = {
      ...user,
      lastUnlockedDay: Math.max(user.lastUnlockedDay, day + 1),
      progressPercentage: Math.round((day / 12) * 100),
    };
    setUser(updated);
    localStorage.setItem("manuscrito_user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, updateProgress }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
