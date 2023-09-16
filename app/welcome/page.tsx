import * as React from "react";
import Link from "next/link";

export default function Welcome() {
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: "url(welcome_bg.jpg)",
            }}
        >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Welcome to the league of MUSIC</h1>
                    <Link className="btn" href={"/main-page"}>
                        Let's go
                    </Link>
                </div>
            </div>
        </div>
    );
}
