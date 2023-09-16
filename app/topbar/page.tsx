import * as React from "react";
import Link from "next/link";

export interface ITopBarProps {}

export default function TopBar(props: ITopBarProps) {
    return (
        <div className="navbar bg-base-100">
            <div className="flex p-2">
                <Link href={"/main-page"} className="btn btn-ghost normal-case text-xl">
                    MUSIC
                </Link>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input
                        type="text"
                        placeholder="Search"
                        className="input input-bordered w-48 md:w-auto"
                    />
                </div>
            </div>
        </div>
    );
}
