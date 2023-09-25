import Image from "next/image";

import { MusicContext } from "../context-provider/MusicContextProvider";
import React from "react";

export default function Player() {
    const musicContext = React.useContext(MusicContext);

    return (
        <div className="p-4 sticky bottom-0 z-10 player-background">
            <input
                onChange={musicContext?.changeProgress}
                type="range"
                max={musicContext?.audio.current.duration.toString()}
                value={musicContext?.currentTime}
                className="range range-xs"
            />

            <div className="flex">
                <div className="w-1/3 flex">
                    <Image
                        src={musicContext?.songs[musicContext.position]["imgFilePath"]}
                        width={70}
                        height={70}
                        alt=""
                        className="rounded-xl"
                    />
                    <div className="ml-3 self-center">
                        <h2>{musicContext?.songs[musicContext.position]["name"]}</h2>
                        <h3>{musicContext?.songs[musicContext.position]["artist"]}</h3>
                    </div>
                </div>

                <div className="w-2/5 flex justify-center self-center">
                    <button className="btn btn-circle m-1" onClick={musicContext?.previous}>
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
                            <polygon points="19 20 9 12 19 4 19 20"></polygon>
                            <line x1="5" y1="19" x2="5" y2="5"></line>
                        </svg>
                    </button>

                    <button
                        className="btn btn-circle m-1"
                        onClick={musicContext?.playing ? musicContext.pause : musicContext?.play}
                    >
                        {musicContext?.playing ? (
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
                                <rect x="6" y="4" width="4" height="16"></rect>
                                <rect x="14" y="4" width="4" height="16"></rect>
                            </svg>
                        ) : (
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
                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                        )}
                    </button>

                    <button className="btn btn-circle m-1" onClick={musicContext?.next}>
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
                            <polygon points="5 4 15 12 5 20 5 4"></polygon>
                            <line x1="19" y1="5" x2="19" y2="19"></line>
                        </svg>
                    </button>

                    {/* <button className="btn btn-circle m-1">
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
                            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                        </svg>
                    </button> */}
                </div>

                <div className="w-1/3 self-center justify-end flex">
                    <input
                        onChange={musicContext?.changeVolume}
                        type="range"
                        max={10}
                        value={musicContext!.currentVolume * 10}
                        className="range range-xs w-32 justify-center"
                    />
                </div>
            </div>
        </div>
    );
}
