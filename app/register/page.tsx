"use client";

import { useRouter } from "next/navigation";
import { MutableRefObject, useRef, useState } from "react";
import { auth } from "../db/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";

export interface IRegisterProps {}

export default function Register(props: IRegisterProps) {
    const emailBox: MutableRefObject<any> = useRef();
    const passBox: MutableRefObject<any> = useRef();
    const [message, setMessage] = useState("");
    const router = useRouter();

    function handleRegister() {
        const email = emailBox.current.value;
        const password = passBox.current.value;
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                setMessage("Sign up successful");
                router.push("/");
            })
            .catch((error) => {
                setMessage(error.toString());
            });
    }

    return (
        <div className="hero min-h-screen bg-base-200 login-background">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left w-96">
                    <h1 className="text-5xl font-bold justify-center flex text-center">
                        Make your own account, human!
                    </h1>
                    <p className="py-6 justify-center flex text-center w-96">
                        Music is a moral law. It gives soul to the universe, wings to the mind,
                        flight to the imagination, and charm and gaiety to life and to everything.
                    </p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        {message && <div className="">{message}</div>}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                ref={emailBox}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                ref={passBox}
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" onClick={handleRegister}>
                                Register
                            </button>
                        </div>
                        <div className="label">
                            Already have an account?
                            <Link href={"/"} className="">
                                Login now
                            </Link>
                        </div>
                        {/* <div className="form-control mt-6">
                            <button className="btn btn-primary" onClick={handleGoogleLogin}>
                                Login with Google
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
