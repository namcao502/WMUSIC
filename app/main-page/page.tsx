"use client";
import * as React from "react";
import TopBar from "../topbar/page";
import SideBar from "../sidebar/page";

export interface IMainPageProps {}

export default function MainPage(props: IMainPageProps) {
    return (
        <div>
            <TopBar />
            <SideBar />
            <div>this is footer</div>
        </div>
    );
}
