"use client";

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { MutableRefObject, useRef, useState } from "react";
import { initFirebase } from "../db/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";

export interface ILoginProps {}

export default function Login(props: ILoginProps) {
    initFirebase();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);

    const [message, setMessage] = useState("");
    const emailBox: MutableRefObject<any> = useRef();
    const passBox: MutableRefObject<any> = useRef();
    const router = useRouter();

    if (loading) {
        return <span className="loading loading-infinity loading-lg"></span>;
    }

    if (user) {
        router.push("/home");
        return <span className="loading loading-infinity loading-lg"></span>;
    }

    async function handleGoogleLogin() {
        const result = await signInWithPopup(auth, provider);
        console.log(result.user);
    }

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
                    <h1 className="mb-5 text-5xl font-bold">Welcome to the music party.</h1>
                    <p className="mb-5">
                        Music is a moral law. It gives soul to the universe, wings to the mind,
                        flight to the imagination, and charm and gaiety to life and to everything.
                    </p>
                    <button className="btn btn-primary" onClick={handleGoogleLogin}>
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
}
