import CustomSessionProvider from "@/providers/session-provider";
import React from "react";
import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <CustomSessionProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </CustomSessionProvider>
    );
}
