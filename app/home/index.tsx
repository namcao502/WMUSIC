import * as React from "react";
import TopBar from "../components/TopBar";
import ImageSlider from "../components/ImageSlider";
import MusicCard from "../components/MusicCard";

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
    return (
        <div>
            <TopBar />
            <ImageSlider />
            <h2 className="text-xl p-4">
                List
                <span className="badge badge-lg">NEW</span>
            </h2>
            <div className="grid grid-cols-4 gap-4">
                <MusicCard />
                <MusicCard />
                <MusicCard />
                <MusicCard />
                <MusicCard />
            </div>
        </div>
    );
}
