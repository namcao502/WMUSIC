"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MusicContextProvider from "./context-provider/MusicContextProvider";
import SideBar from "./components/SideBar";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Music",
    description: "Create with love",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const showSideBar = pathname == "/" || pathname == "/register" ? false : true;

    return (
        <html lang="en">
            <body className={inter.className}>
                {showSideBar ? (
                    <MusicContextProvider>
                        <SideBar>{children}</SideBar>
                    </MusicContextProvider>
                ) : (
                    <MusicContextProvider>{children}</MusicContextProvider>
                )}
            </body>
        </html>
    );
}
