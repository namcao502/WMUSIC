import { DocumentData } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import useStateRef from "react-usestateref";

export interface IPlayerProps {
    songList: DocumentData[];
    position: number;
}

export default function Player(props: IPlayerProps) {
    // console.log(props.songList[0]["filePath"]);
    const [playing, setPlaying] = useState(true);
    const [index, setIndex, indexRef] = useStateRef(props.position);
    const [audio] = useState(new Audio(props.songList[indexRef.current]["filePath"]));
    const [currentTime, setCurrentTime, currentTimeRef] = useStateRef(0);
    const [currentVolume, setCurrentVolume, currentVolumeRef] = useStateRef(0);
    // const [audioRef, setAudioRef] = useState(useRef(audio));
    // var audio = new Audio(props.listUrl[index]);
    // audio.play();
    const progressBar = useRef<HTMLInputElement>(null);

    // console.log("update current time: " + audio.currentTime);
    // setCurrentTime(audio.currentTime);
    useEffect(() => {
        setCurrentTime(audio.currentTime);
        setCurrentVolume(audio.volume);
    }, [audio.currentTime, audio.volume]);

    useEffect(() => {
        audio.play();
    }, [audio]);

    // const updateTime = () => {
    //     setCurrentTime(audio.currentTime);
    // };

    // setInterval(updateTime, 1000);

    const play = () => {
        setPlaying(true);
        audio.play();
        console.log("duration: " + audio.duration);
    };

    const pause = () => {
        setPlaying(false);
        audio.pause();
    };

    const next = () => {
        var temp = indexRef.current + 1;
        if (temp == props.songList.length) {
            temp = 0;
        }
        setIndex(temp);
        if (playing) {
            audio.pause();
            audio.currentTime = 0;
        }
        audio.src = props.songList[indexRef.current]["filePath"];
        audio.play();
        setPlaying(true);
    };

    const previous = () => {
        var temp = indexRef.current - 1;
        if (temp < 0) {
            temp = props.songList.length - 1;
        }
        setIndex(temp);
        if (playing) {
            audio.pause();
            audio.currentTime = 0;
        }
        audio.src = props.songList[indexRef.current]["filePath"];
        audio.play();
        setPlaying(true);
    };

    return (
        <div className="m-4">
            <input
                type="range"
                max={audio.duration}
                value={currentTimeRef.current}
                ref={progressBar}
                className="range range-xs"
            />

            <div className="flex">
                <div className="w-1/3 flex">
                    <Image
                        src={props.songList[indexRef.current]["imgFilePath"]}
                        width={70}
                        height={70}
                        alt=""
                        className="rounded-xl"
                    />
                    <div className="ml-3 self-center">
                        <h2>{props.songList[indexRef.current]["name"]}</h2>
                        <h3>{props.songList[indexRef.current]["artist"]}</h3>
                    </div>
                </div>

                <div className="w-2/5 flex justify-center self-center">
                    <button className="btn btn-circle m-1" onClick={previous}>
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

                    <button className="btn btn-circle m-1" onClick={playing ? pause : play}>
                        {playing ? (
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

                    <button className="btn btn-circle m-1" onClick={next}>
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

                    <button className="btn btn-circle m-1">
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
                    </button>
                </div>

                <div className="w-1/3 self-center justify-end flex">
                    <input
                        type="range"
                        max={1}
                        value={currentVolumeRef.current}
                        className="range range-xs w-32 justify-center"
                    />
                </div>
            </div>
        </div>
    );
}
