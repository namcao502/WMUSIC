"use client";

import { signIn } from "next-auth/react";
import * as React from "react";

export interface ILoginProps {}

export default function Login(props: ILoginProps) {
    function handleLogin() {
        signIn("google");
    }

    return (
        <div className="hero min-h-screen bg-base-200 login-background">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left w-96">
                    <h1 className="text-5xl font-bold justify-center flex text-center">
                        Welcome to the party, human!
                    </h1>
                    <p className="py-6 justify-center flex text-center w-96">
                        Music is a moral law. It gives soul to the universe, wings to the mind,
                        flight to the imagination, and charm and gaiety to life and to everything.
                    </p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="text"
                                placeholder="email"
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="text"
                                placeholder="password"
                                className="input input-bordered"
                            />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">
                                    Forgot password?
                                </a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" onClick={handleLogin}>
                                Login with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
