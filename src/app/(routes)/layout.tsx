import "@/app/globals.css";
import Footer from "@/components/navigation/Footer";
import Header from "@/components/navigation/Header";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/providers/providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: process.env.NEXT_PUBLIC_APP_TITLE,
    description: "Generated by jlerocher",
    keywords: "nextjs, tailwindcss, prisma, typescript, react",
    robots: "index, follow",
    authors: [{ name: "Jean Le Rocher", url: "https://jlerocher.com" }],
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <Header />
                    {children}
                    <Footer />
                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}
