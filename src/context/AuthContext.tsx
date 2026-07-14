import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { apiFetch } from "@/lib/api";

export type AuthUser = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isReady: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const USER_KEY = "sane_user";
const TOKEN_KEY = "sane_token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(USER_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(TOKEN_KEY);
      }
    }
    setIsReady(true);
  }, []);

  const persist = useCallback((authUser: AuthUser) => {
    localStorage.setItem(USER_KEY, JSON.stringify(authUser));
    localStorage.setItem(TOKEN_KEY, authUser.token);
    setUser(authUser);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const authUser = await apiFetch<AuthUser>("/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      persist(authUser);
    },
    [persist],
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const authUser = await apiFetch<AuthUser>("/users/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      persist(authUser);
    },
    [persist],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    isReady,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
