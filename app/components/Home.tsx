import TopBar from "./TopBar";
import ImageSlider from "./ImageSlider";
import MusicCard from "./MusicCard";
import Player from "./Player";
import db from "../db/firestore";
import {
    collection,
    QueryDocumentSnapshot,
    DocumentData,
    query,
    where,
    limit,
    getDocs,
} from "@firebase/firestore";
import { useEffect, useState } from "react";

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
    const songCollection = collection(db.firestore, "Song");

    const [songs, setSongs] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getSong = async () => {
        // construct a query to get songs
        const songQuery = query(songCollection, where("name", "!=", ""));
        // get the songs
        const querySnapshot = await getDocs(songQuery);

        // map through songs adding them to an array
        const result: QueryDocumentSnapshot<DocumentData>[] = [];
        querySnapshot.forEach((snapshot) => {
            result.push(snapshot);
        });
        // set it to state
        setSongs(result);
    };

    useEffect(() => {
        // get the songs
        getSong();
        // reset loading
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <div>
            <div className="grid-rows-1">
                <TopBar />
                <Player />
            </div>

            <ImageSlider />
            <h2 className="text-xl p-4">
                List
                <span className="badge badge-lg">NEW</span>
                <div>{songs.length}</div>
            </h2>
            <div className="grid grid-cols-4 gap-4 m-4">
                {loading ? (
                    <h2>Loading...</h2>
                ) : songs.length === 0 ? (
                    <h2>Nothing here</h2>
                ) : (
                    songs.map((song) => {
                        return (
                            <MusicCard
                                id={song.get("id")}
                                name={song.get("name")}
                                imgFilePath={song.get("imgFilePath")}
                                filePath={""}
                                artist={""}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}
