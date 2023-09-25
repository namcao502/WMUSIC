"use client";
import SongList from "../components/Song";
import db from "../db/firestore";
import { collection, DocumentData, query, where, limit, getDocs } from "@firebase/firestore";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import ImageSlider from "../components/ImageSlider";
import { MusicContext } from "../context-provider/MusicContextProvider";
import SystemPlaylist from "../components/SystemPlaylist";

export default function Home() {
    const [songs, setSongs] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const textContext = React.useContext(MusicContext);
    const [systemPlaylists, setSystemPlaylists] = useState<DocumentData[]>([]);

    const getSongs = async () => {
        // construct a query to get songs
        const songQuery = query(
            collection(db.firestore, "Song"),
            where("name", "!=", ""),
            limit(5),
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

    const getSystemPlaylist = async () => {
        // construct a query to get songs
        const systemPlaylistQuery = query(collection(db.firestore, "Playlist"));
        // get the songs
        const querySnapshot = await getDocs(systemPlaylistQuery);

        // map through songs adding them to an array
        const result: DocumentData[] = [];
        querySnapshot.forEach((snapshot) => {
            result.push(snapshot.data());
        });
        // set it to state
        setSystemPlaylists(result);
    };

    useEffect(() => {
        // get the songs
        getSongs();
        // get system playlists
        getSystemPlaylist();
        // reset loading
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    function clickASong(id: string) {
        textContext?.setSong(songs, id);
    }

    function clickMenuSystemPlaylist(id: number, option: string) {
        console.log("id: " + id + " option: " + option);
    }

    return (
        <div>
            <ImageSlider />
            <SystemPlaylist
                systemPlaylists={systemPlaylists}
                clickMenuSystemPlaylist={clickMenuSystemPlaylist}
                loading={loading}
            />
            <SongList songList={songs} clickASong={clickASong} loading={loading} />
        </div>
    );
}
