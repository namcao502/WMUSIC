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

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
    const [songs, setSongs] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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

    useEffect(() => {
        // get the songs
        getSong();
        // reset loading
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <div>
            <div className="grid-rows-1">
                <TopBar />
                <Player
                    listUrl={[
                        "https://firebasestorage.googleapis.com/v0/b/music-c3885.appspot.com/o/Songs%2FSky%20High?alt=media&token=2dec5e21-d088-4df8-9f3a-803efc97bc56",
                        "https://firebasestorage.googleapis.com/v0/b/music-c3885.appspot.com/o/Songs%2FPain?alt=media&token=6f890122-4f8e-4e16-a797-5969194eb15b",
                    ]}
                />
            </div>

            <ImageSlider />
            <h2 className="text-xl p-4">
                List
                <span className="badge badge-lg">{songs.length}</span>
            </h2>
            <div className="grid grid-cols-6 gap-4 m-4">
                {loading ? (
                    <h2>Loading...</h2>
                ) : songs.length === 0 ? (
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
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}
