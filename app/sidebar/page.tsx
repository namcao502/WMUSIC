import * as React from "react";
import { useState } from "react";

export interface ISideBarProps {}

export default function SideBar(props: ISideBarProps) {
    const [fragment, setFragment] = useState("Home");
    function renderComponent(name: string) {
        if (name === "Home") {
            return <div>this is home</div>;
        } else if (name === "Artist") {
            return <div>this is artist</div>;
        } else {
            return <div>this is another</div>;
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
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <li>
                        <button onClick={() => setFragment("Home")}>Home</button>
                    </li>
                    <li>
                        <button onClick={() => setFragment("Artist")}>Artist</button>
                    </li>
                    <li>
                        <button onClick={() => setFragment("Profile")}>Profile</button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
