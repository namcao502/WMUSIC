"use client";

import Link from "next/link";
import React from "react";
import { MusicContext } from "../context-provider/MusicContextProvider";
import Player from "./Player";
import { signOut, useSession } from "next-auth/react";

export interface ISideBarProps {
    children: React.ReactNode;
}

export default function SideBar(props: ISideBarProps) {
    const textContext = React.useContext(MusicContext);
    const session = useSession();
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-start w-full">
                    {/* Page content here */}
                    {props.children}
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <div className="dropdown dropdown-hover">
                            <label tabIndex={0} className="btn m-1">
                                Hello, {session.data?.user?.name}
                            </label>
                            <ul
                                tabIndex={0}
                                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box"
                            >
                                <li>
                                    <a onClick={() => signOut()}>Sign out</a>
                                </li>
                            </ul>
                        </div>
                        <li>
                            <Link href={"/home"}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#000000"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href={"/search"}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#000000"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                                Search
                            </Link>
                        </li>
                        <li>
                            <Link href={"/library"}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#000000"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                                </svg>
                                Library
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            {textContext?.songs.length == 0 ? <></> : <Player />}
        </div>
    );
}
