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

export interface IHomeProps {
    songList: DocumentData[];
    clickASong: (id: string) => void;
    loading: boolean;
}

export default function Home(props: IHomeProps) {
    // const [songs, setSongs] = useState<DocumentData[]>([]);
    // const [loading, setLoading] = useState<boolean>(true);

    // const getSong = async () => {
    //     // construct a query to get songs
    //     const songQuery = query(
    //         collection(db.firestore, "Song"),
    //         where("name", "!=", ""),
    //         limit(10),
    //     );
    //     // get the songs
    //     const querySnapshot = await getDocs(songQuery);

    //     // map through songs adding them to an array
    //     const result: DocumentData[] = [];
    //     querySnapshot.forEach((snapshot) => {
    //         var temp: DocumentData = snapshot.data();
    //         temp["artist"] = getArtistsBySongID(temp["id"]);
    //         result.push(temp);
    //     });
    //     // set it to state
    //     setSongs(result);
    // };

    // const getArtistsBySongID = async (id: string) => {
    //     // construct a query to get artists
    //     const artistQuery = query(
    //         collection(db.firestore, "Artist"),
    //         where("songs", "array-contains", id),
    //     );
    //     // get the artists
    //     const querySnapshot = await getDocs(artistQuery);
    //     // map through songs adding them to an array
    //     const result: DocumentData[] = [];
    //     querySnapshot.forEach((snapshot) => {
    //         result.push(snapshot.data());
    //     });
    //     // set it to state
    //     // setArtists(result);
    //     let temp: string = "";
    //     result.map((artist) => {
    //         temp = temp.concat(", ", artist["name"]);
    //     });
    //     return temp.replace(",", "");
    // };

    // useEffect(() => {
    //     // get the songs
    //     getSong();
    //     // reset loading
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 2000);
    // }, []);

    return (
        <div>
            {/* <div className="grid-rows-1">
                <TopBar />
            </div> */}

            <ImageSlider />
            <h2 className="text-xl p-4">
                Today special
                <span className="badge badge-lg">{props.songList.length}</span>
            </h2>
            <div className="grid grid-cols-7 gap-4 m-4">
                {props.loading ? (
                    <h2>Loading...</h2>
                ) : props.songList.length == 0 ? (
                    <h2>Nothing here</h2>
                ) : (
                    props.songList.map((song) => {
                        return (
                            <MusicCard
                                key={song["id"]}
                                id={song["id"]}
                                name={song["name"]}
                                imgFilePath={song["imgFilePath"]}
                                artist={song["artist"]}
                                filePath={song["filePath"]}
                                clickASong={props.clickASong}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}
