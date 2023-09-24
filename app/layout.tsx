import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MusicContextProvider from "./music-context/musicContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Music",
    description: "Create with love",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <MusicContextProvider> {children}</MusicContextProvider>
            </body>
        </html>
    );
}
