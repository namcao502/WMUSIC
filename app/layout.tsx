import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MusicContextProvider from "./context-provider/MusicContextProvider";
import SideBar from "./components/SideBar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import SessionProvider from "./context-provider/SessionProvider";
import Login from "./login/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Music",
    description: "Create with love",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionProvider session={session}>
                    {!session ? (
                        <Login />
                    ) : (
                        <MusicContextProvider>
                            <SideBar>{children}</SideBar>
                        </MusicContextProvider>
                    )}
                </SessionProvider>
            </body>
        </html>
    );
}
