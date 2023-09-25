import MusicCard from "./SongCard";
import { DocumentData } from "@firebase/firestore";

export interface IHomeProps {
    songList: DocumentData[];
    clickASong: (id: string) => void;
    loading: boolean;
}

export default function Song(props: IHomeProps) {
    return (
        <div>
            <h2 className="text-xl p-4">
                SONGS
                <span className="badge badge-lg">{props.songList.length}</span>
            </h2>
            <div className="grid grid-cols-6 gap-4 m-4">
                {props.loading ? (
                    <span className="loading loading-infinity loading-lg"></span>
                ) : props.songList.length == 0 ? (
                    <h2>Nothing here</h2>
                ) : (
                    props.songList.map((song) => {
                        return (
                            <MusicCard
                                key={song["id"]}
                                id={song["id"]}
                                name={song["name"]}
                                imgFilePath={song["imgFilePath"]}
                                artist={song["artist"]}
                                filePath={song["filePath"]}
                                clickASong={props.clickASong}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}
