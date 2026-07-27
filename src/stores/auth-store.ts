import { create } from "zustand";

interface AuthState {
  userId: number | null;
  userName: string;
  userEmail: string;
  isAuthenticated: boolean;
  login: (userId: number, name: string, email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: 1,
  userName: "",
  userEmail: "",
  isAuthenticated: false,
  login: (userId, userName, userEmail) =>
    set({ userId, userName, userEmail, isAuthenticated: true }),
  logout: () =>
    set({ userId: null, userName: "", userEmail: "", isAuthenticated: false }),
}));
