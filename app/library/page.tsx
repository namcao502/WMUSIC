"use client";

import { MutableRefObject, useEffect, useRef, useState } from "react";
import Playlist from "../components/Playlist";
import SideBar from "../components/SideBar";

export interface ILibraryProps {}

const LOCAL_STORAGE_KEY: string = "w-music-playlists";

export default function Library(props: ILibraryProps) {
    const [playlists, setPlaylists] = useState([{ id: 0, name: "Favorite 2023", numberOfSong: 0 }]);
    const [tempUpdate, setTempUpdate] = useState<number>(-1);

    const addBox: MutableRefObject<any> = useRef();
    const updateBox: MutableRefObject<any> = useRef();

    useEffect(() => {
        const value = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (value != null) {
            const playlists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!);
            setPlaylists(playlists);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(playlists));
    }, [playlists]);

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
        </div>
    );
}
