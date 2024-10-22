import "@/app/globals.css";
import Footer from "@/components/navigation/Footer";
import Header from "@/components/navigation/Header";
import Providers from "@/providers/providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: process.env.NEXT_PUBLIC_APP_TITLE,
    description: "Generated by jlerocher",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <Header />
                    <main className="min-h-screen border">{children}</main>
                    <Footer />
                </Providers>
                <Script
                    src="https://accounts.google.com/gsi/client"
                    strategy="beforeInteractive"
                />
            </body>
        </html>
    );
}