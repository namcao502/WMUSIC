"use client";

import { firestore } from "../db/firestore";
import Constants from "../util/constants";
import MusicCard from "../components/SongCard";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { collection, DocumentData, query, where, limit, getDocs } from "@firebase/firestore";
import { MusicContext } from "../context-provider/MusicContextProvider";

export interface IHomeProps {}

export default function Song(props: IHomeProps) {
    const [songs, setSongs] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const searchParams = useSearchParams();
    const songList: string[] = JSON.parse(searchParams?.get("songs")!);
    const textContext = useContext(MusicContext);

    const getSongs = async () => {
        // construct a query to get songs
        const songQuery = query(
            collection(firestore, "Song"),
            where("id", "in", songList),
            limit(10),
        );
        // get the songs
        const querySnapshot = await getDocs(songQuery);
        // map through songs adding them to an array
        const result: DocumentData[] = [];
        querySnapshot.forEach((snapshot) => {
            var temp: DocumentData = snapshot.data();
            temp["artist"] = getArtistsBySongID(temp["id"]);
            result.push(temp);
        });
        // set it to state
        setSongs(result);
    };

    const getArtistsBySongID = async (id: string) => {
        // construct a query to get artists
        const artistQuery = query(
            collection(firestore, "Artist"),
            where("songs", "array-contains", id),
        );
        // get the artists
        const querySnapshot = await getDocs(artistQuery);
        // map through songs adding them to an array
        const result: DocumentData[] = [];
        querySnapshot.forEach((snapshot) => {
            result.push(snapshot.data());
        });
        // set it to state
        // setArtists(result);
        let temp: string = "";
        result.map((artist) => {
            temp = temp.concat(", ", artist["name"]);
        });
        return temp.replace(",", "");
    };

    useEffect(() => {
        // get the songs
        getSongs();
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    function clickASong(id: string) {
        textContext?.setSong(songs, id);
    }

    return (
        <div className="items-center justify-start w-full m-4">
            <h2 className="text-xl p-4">
                {Constants.PLAYLISTS}
                <span className="badge badge-lg">{songs.length}</span>
            </h2>
            <div className="grid grid-cols-6 gap-4 m-4">
                {loading ? (
                    <span className="loading loading-infinity loading-lg"></span>
                ) : songs.length == 0 ? (
                    <h2>Nothing here</h2>
                ) : (
                    songs.map((song) => {
                        return (
                            <MusicCard
                                key={song["id"]}
                                id={song["id"]}
                                name={song["name"]}
                                imgFilePath={song["imgFilePath"]}
                                artist={song["artist"]}
                                filePath={song["filePath"]}
                                clickASong={clickASong}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}
