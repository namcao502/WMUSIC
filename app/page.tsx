"use client";
import SongList from "./components/Song";
import Player from "./components/Player";
import db from "./db/firestore";
import { collection, DocumentData, query, where, limit, getDocs } from "@firebase/firestore";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import ImageSlider from "./components/ImageSlider";
import Playlist from "./components/Playlist";
import { MusicContext } from "./music-context/musicContextProvider";

const LOCAL_STORAGE_KEY: string = "w-music-playlists";

export default function Home() {
    const [songs, setSongs] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [playlists, setPlaylists] = useState([{ id: 0, name: "Favorite 2023", numberOfSong: 0 }]);
    const [tempUpdate, setTempUpdate] = useState<number>(-1);
    const textContext = React.useContext(MusicContext);

    const getSong = async () => {
        // construct a query to get songs
        const songQuery = query(collection(db.firestore, "Song"), where("name", "!=", ""));
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

    const addBox: MutableRefObject<any> = useRef();
    const updateBox: MutableRefObject<any> = useRef();

    useEffect(() => {
        const value = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (value != null) {
            const playlists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!);
            setPlaylists(playlists);
            //setTodos((prevTodos) => [...prevTodos, ...storedTodos]);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(playlists));
    }, [playlists]);

    useEffect(() => {
        // get the songs
        getSong();
        // reset loading
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    function clickASong(id: string) {
        textContext?.setSong(songs, id);
        console.log(songs);
        console.log("id " + id);
    }

    function clickAPlaylist(id: number, option: string) {
        if (option == "Rename") {
            //open modal to change name here
            setTempUpdate(id);
            (document.getElementById("my_modal_4") as HTMLDialogElement).showModal();
            const playlist = playlists.find((playlist) => playlist.id == id);
            (document.getElementById("temp-text") as HTMLInputElement).value = playlist!.name;
        } else if (option == "Delete") {
            //remove it from array
            setPlaylists(playlists.filter((playlist) => playlist.id != id));
        }
    }

    function renamePlaylist() {
        const updateName = updateBox.current.value;
        const tempPlaylists = [...playlists];
        const playlist = tempPlaylists.find((playlist) => playlist.id === tempUpdate);
        if (playlist) playlist.name = updateName;
        setPlaylists(tempPlaylists);
        (document.getElementById("my_modal_4") as HTMLDialogElement).close();
    }

    function clickAddPlaylist() {
        const name = addBox.current.value;
        const index: number = playlists.length + 1;
        if (name == "") {
            return;
        }
        setPlaylists((prevPlaylists) => {
            return [...prevPlaylists, { id: index, name: name, numberOfSong: 0 }];
        });
        (document.getElementById("my_modal_3") as HTMLDialogElement).close();
    }

    return (
        <div>
            {textContext?.songs.length == 0 ? <></> : <Player />}
            <ImageSlider />
            <h2 className="text-xl p-4 flex justify-start items-center">
                PLAYLISTS
                <button
                    className="btn btn-circle btn-sm m-1 justify-center"
                    onClick={() =>
                        (document.getElementById("my_modal_3") as HTMLDialogElement).showModal()
                    }
                >
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
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                            </button>
                        </form>
                        <h3 className="font-bold text-lg">
                            Please type a name for your awesome playlist
                        </h3>
                        <input
                            type="text"
                            ref={addBox}
                            placeholder="Type here"
                            className="input w-full max-w-xs mt-3"
                        />
                        <button className="btn ms-4 w-auto" onClick={clickAddPlaylist}>
                            Save
                        </button>
                    </div>
                </dialog>
                <dialog id="my_modal_4" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                            </button>
                        </form>
                        <h3 className="font-bold text-lg">
                            Please type a name for your awesome playlist
                        </h3>
                        <input
                            id="temp-text"
                            type="text"
                            ref={updateBox}
                            placeholder="Type here"
                            className="input w-full max-w-xs mt-3"
                        />
                        <button className="btn ms-4 w-auto" onClick={renamePlaylist}>
                            Update
                        </button>
                    </div>
                </dialog>
            </h2>
            <Playlist playlists={playlists} clickAPlaylist={clickAPlaylist} />
            <SongList songList={songs} clickASong={clickASong} loading={loading} />
        </div>
    );
}
