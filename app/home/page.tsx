"use client";
import db from "../db/firestore";
import { collection, DocumentData, query, where, limit, getDocs } from "@firebase/firestore";
import { useContext, useEffect, useState } from "react";
import ImageSlider from "../components/ImageSlider";
import { MusicContext } from "../context-provider/MusicContextProvider";
import SystemPlaylist from "../components/SystemPlaylist";
import Constants from "../util/constants";

export default function Home() {
    const [songs, setSongs] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const textContext = useContext(MusicContext);
    const [systemPlaylists, setSystemPlaylists] = useState<DocumentData[]>([]);
    const [artists, setArtists] = useState<DocumentData[]>([]);
    const [albums, setAlbums] = useState<DocumentData[]>([]);
    const [countries, setCountries] = useState<DocumentData[]>([]);

    const getSystemPlaylists = async () => {
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

    const getArtists = async () => {
        // construct a query to get songs
        const systemPlaylistQuery = query(collection(db.firestore, "Artist"));
        // get the songs
        const querySnapshot = await getDocs(systemPlaylistQuery);

        // map through songs adding them to an array
        const result: DocumentData[] = [];
        querySnapshot.forEach((snapshot) => {
            result.push(snapshot.data());
        });
        // set it to state
        setArtists(result);
    };

    const getAlbums = async () => {
        // construct a query to get songs
        const systemPlaylistQuery = query(collection(db.firestore, "Album"));
        // get the songs
        const querySnapshot = await getDocs(systemPlaylistQuery);

        // map through songs adding them to an array
        const result: DocumentData[] = [];
        querySnapshot.forEach((snapshot) => {
            result.push(snapshot.data());
        });
        // set it to state
        setAlbums(result);
    };

    const getCountries = async () => {
        // construct a query to get songs
        const systemPlaylistQuery = query(collection(db.firestore, "Country"));
        // get the songs
        const querySnapshot = await getDocs(systemPlaylistQuery);

        // map through songs adding them to an array
        const result: DocumentData[] = [];
        querySnapshot.forEach((snapshot) => {
            result.push(snapshot.data());
        });
        // set it to state
        setCountries(result);
    };

    useEffect(() => {
        // get the songs
        // getSongs();
        // get system playlists
        getSystemPlaylists();
        // get artists
        // getArtists();
        // get albums
        // getAlbums();
        // get countries
        // getCountries();
        // reset loading
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [songs, systemPlaylists, artists]);

    function clickASong(id: string) {
        textContext?.setSong(songs, id);
    }

    function clickMenuSystemPlaylist(id: string, option: string) {
        console.log("id: " + id + ", option: " + option);
    }

    return (
        <div>
            <ImageSlider />
            <SystemPlaylist
                name={Constants.PLAYLISTS}
                systemPlaylists={systemPlaylists}
                clickMenuSystemPlaylist={clickMenuSystemPlaylist}
                loading={loading}
            />
            <SystemPlaylist
                name={Constants.ARTISTS}
                systemPlaylists={artists}
                clickMenuSystemPlaylist={clickMenuSystemPlaylist}
                loading={loading}
            />
            <SystemPlaylist
                name={Constants.ALBUMS}
                systemPlaylists={albums}
                clickMenuSystemPlaylist={clickMenuSystemPlaylist}
                loading={loading}
            />
            <SystemPlaylist
                name={Constants.COUNTRIES}
                systemPlaylists={countries}
                clickMenuSystemPlaylist={clickMenuSystemPlaylist}
                loading={loading}
            />
            {/* <SongList songList={songs} clickASong={clickASong} loading={loading} /> */}
        </div>
    );
}
