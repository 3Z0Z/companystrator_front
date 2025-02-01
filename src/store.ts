import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { logoutService } from "./services/AuthService";

type AuthState = {
  username: string | null;
  token: string | null;
  renewTime: number | null;
  role: 'ADMIN'|'CLIENT'|'VISITOR';
  setToken: (token: string | null) => void;
  setRenewTime: (time: number | null) => void;
  clearAuth: () => Promise<void>;
};

export const useAuthStorage = create<AuthState>((set) => {
  const token = localStorage.getItem("token");
  let initialRole: 'ADMIN'|'CLIENT'|'VISITOR' = 'VISITOR';
  let initialUsername: string | null = null;
  let initialRenewTime: number | null = null;

  if (token) {
    try {
      const decoded: { role: string; sub: string, exp: number } = jwtDecode(token);
      initialRole = decoded.role as 'ADMIN'|'CLIENT';
      initialUsername = decoded.sub;
      initialRenewTime = decoded.exp;
    } catch {
      console.error("Invalid token");
      localStorage.removeItem("token");
    }
  }

  return {
    username: initialUsername,
    token,
    renewTime: initialRenewTime,
    role: initialRole,
    setToken: (token) => {
      if (token) {
        localStorage.setItem("token", token);
        try {
          const decoded: { role: string; sub: string, exp: number } = jwtDecode(token);
          set({ 
            username: decoded.sub,
            token,
            renewTime: decoded.exp,
            role: decoded.role as 'ADMIN'|'CLIENT',
          });
        } catch {
          console.error("Invalid token");
          localStorage.removeItem("token");
          set({ token: null, role: 'VISITOR', username: null, renewTime: null });
        }
      } else {
        localStorage.removeItem("token");
        set({ token: null, role: 'VISITOR', username: null, renewTime: null });
      }
    },
    setRenewTime: (time) => {
      set((state) => ({ ...state, renewTime: time }));
    },
    clearAuth: async () => {
      localStorage.removeItem("token");
      set({ token: null, role: 'VISITOR', username: null, renewTime: null });
      await logoutService();
    }
  };
});