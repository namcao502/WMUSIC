"use client";

import { DocumentData } from "firebase/firestore";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

export interface IPlayerProps {
    currentTime: number;
    currentVolume: number;
    playing: boolean;
    songs: DocumentData[];
    position: number;
    audio: React.MutableRefObject<HTMLAudioElement>;
    play: () => void;
    pause: () => void;
    next: () => void;
    previous: () => void;
    changeVolume: (event: ChangeEvent<HTMLInputElement>) => void;
    changeProgress: (event: ChangeEvent<HTMLInputElement>) => void;
    setSong: (songs: DocumentData[], id: string) => void;
}

export const MusicContext = React.createContext<IPlayerProps | null>(null);

export interface IAppProps {
    children: React.ReactNode;
}

export default function MusicContextProvider(props: IAppProps) {
    const [playing, setPlaying] = useState(true);
    const [songs, setSongs] = useState<DocumentData[]>([]);
    const [position, setPosition] = useState<number>(-1);
    const audio = useRef(new Audio());
    const [currentTime, setCurrentTime] = useState(0);
    const [currentVolume, setCurrentVolume] = useState(1);

    useEffect(() => {
        const handleEvent = (event: Event) => {
            setCurrentTime((event.currentTarget as HTMLAudioElement).currentTime);
        };
        audio.current.addEventListener("timeupdate", handleEvent);
    }, [audio.current]);

    useEffect(() => {
        audio.current.onended = () => {
            next();
        };
    }, [audio.current]);

    useEffect(() => {
        if (position != -1) {
            audio.current.src = songs[position]["filePath"];
            audio.current.play();
            setPlaying(true);
        }
    }, [position]);

    const setSong = (songs: DocumentData[], id: string) => {
        setSongs(songs);
        setPosition(songs.findIndex((song) => song["id"] == id));
    };

    const play = () => {
        setPlaying(true);
        audio.current.play();
    };

    const pause = () => {
        setPlaying(false);
        audio.current.pause();
    };

    const next = () => {
        var temp = position + 1;
        if (temp == songs.length) {
            temp = 0;
        }
        setPosition(temp);
    };

    const previous = () => {
        var temp = position - 1;
        if (temp < 0) {
            temp = songs.length - 1;
        }
        setPosition(temp);
    };

    const changeVolume = (event: ChangeEvent<HTMLInputElement>) => {
        audio.current.volume = parseInt(event.target.value) / 10;
        setCurrentVolume(parseInt(event.target.value) / 10);
    };

    const changeProgress = (event: ChangeEvent<HTMLInputElement>) => {
        audio.current.currentTime = parseInt(event.target.value);
        setCurrentTime(parseInt(event.target.value));
    };

    const tempVal: IPlayerProps = {
        currentTime: currentTime,
        currentVolume: currentVolume,
        playing: playing,
        songs: songs,
        position: position,
        audio: audio,
        play: play,
        pause: pause,
        next: next,
        previous: previous,
        changeVolume: changeVolume,
        changeProgress: changeProgress,
        setSong: setSong,
    };

    return <MusicContext.Provider value={tempVal}>{props.children}</MusicContext.Provider>;
}
