import "@/app/globals.css";
import Footer from "@/components/navigation/Footer";
import Header from "@/components/navigation/Header";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/providers/providers";
import { AppMetadata } from "AppMetadata";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: AppMetadata.title,
    description: AppMetadata.description,
    keywords: AppMetadata.keywords,
    robots: "index, follow",
    authors: [{ name: "Jean Le Rocher", url: "https://jlerocher.com" }],
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className="scroll-smooth">
            <head>
                <link rel="canonical" href={AppMetadata.baseUrl} />
            </head>
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
