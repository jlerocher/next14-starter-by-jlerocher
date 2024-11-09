import { create } from "zustand";

interface nameState {
    name: string;
    setName: (name: string) => void;
}

interface EmailState {
    email: string;
    setEmail: (email: string) => void;
}

interface PasswordState {
    password: string;
    setPassword: (password: string) => void;
}

interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

interface UserState {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const useEmailStore = create<EmailState>((set) => ({
    email: "",
    setEmail: (email) => set({ email }),
}));

export const usePasswordStore = create<PasswordState>((set) => ({
    password: "",
    setPassword: (password) => set({ password }),
}));

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));

export const useNameStore = create<nameState>((set) => ({
    name: "",
    setName: (name) => set({ name }),
}));
