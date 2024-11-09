import { create } from "zustand";

interface EmailState {
    email: string;
    setEmail: (email: string) => void;
}

interface PasswordState {
    password: string;
    setPassword: (password: string) => void;
}

export const useEmailStore = create<EmailState>((set) => ({
    email: "",
    setEmail: (email) => set({ email }),
}));

export const usePasswordStore = create<PasswordState>((set) => ({
    password: "",
    setPassword: (password) => set({ password }),
}));
