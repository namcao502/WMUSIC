"use client";
import Welcome from "./components/Welcome";
import SongList from "./components/Home";
import Player from "./components/Player";
import db from "./db/firestore";
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

export default function Home() {
    const [songs, setSongs] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [position, setPosition] = useState<number>(-1);

    const getSong = async () => {
        // construct a query to get songs
        const songQuery = query(
            collection(db.firestore, "Song"),
            where("name", "!=", ""),
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
            collection(db.firestore, "Artist"),
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
        getSong();
        // reset loading
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    function clickASong(id: string) {
        console.log(songs.findIndex((song) => song["id"] == id));
        setPosition(songs.findIndex((song) => song["id"] == id));
    }

    // return <Welcome></Welcome>;
    return (
        <div>
            {position == -1 ? <></> : <Player songList={songs} position={position} />}
            <SongList songList={songs} clickASong={clickASong} loading={loading} />
        </div>
    );
}
