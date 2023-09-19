import { useState } from "react";
import Home from "./Home";
import { useRouter } from "next/navigation";

export interface ISideBarProps {}

export default function SideBar(props: ISideBarProps) {
    const router = useRouter();
    const [fragment, setFragment] = useState("Home");
    function renderComponent(name: string) {
        if (name === "Home") {
            return <Home />;
        } else if (name === "Explore") {
            return <div>this is Explore</div>;
        } else if (name === "Profile") {
            return <div>this is Profile</div>;
        }
    }
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                {renderComponent(fragment)}
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-48 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <button className="btn" onClick={() => router.push("/main-page")}>
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
                            <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                        </svg>
                        MUSIC
                    </button>
                    <li>
                        <button onClick={() => setFragment("Home")}>
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
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setFragment("Explore")}>
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
                                <circle cx="12" cy="12" r="10" />
                                <path d="M16.2 7.8l-2 6.3-6.4 2.1 2-6.3z" />
                            </svg>
                            Explore
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setFragment("Profile")}>
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
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            Profile
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
