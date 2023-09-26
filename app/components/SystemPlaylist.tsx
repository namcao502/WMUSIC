import { DocumentData } from "firebase/firestore";
import SystemPlaylistCard from "./SystemPlaylistCard";

export interface ISystemPlaylistProps {
    name: string;
    systemPlaylists: DocumentData[];
    loading: boolean;
    clickMenuSystemPlaylist: (id: string, option: string) => void;
}

export default function SystemPlaylist(props: ISystemPlaylistProps) {
    return (
        <div>
            <h2 className="text-xl p-4 flex justify-start items-center">
                {props.name}
                <span className="badge badge-lg">{props.systemPlaylists.length}</span>
            </h2>
            <div className="grid grid-cols-6 gap-4 m-4">
                {props.loading ? (
                    <span className="loading loading-infinity loading-lg"></span>
                ) : props.systemPlaylists.length == 0 ? (
                    <h2>Nothing here</h2>
                ) : (
                    props.systemPlaylists.map((systemPlaylist) => {
                        return (
                            <SystemPlaylistCard
                                key={systemPlaylist["id"]}
                                id={systemPlaylist["id"]}
                                name={systemPlaylist["name"]}
                                imgFilePath={systemPlaylist["imgFilePath"]}
                                songs={systemPlaylist["songs"]}
                                clickMenuSystemPlaylist={props.clickMenuSystemPlaylist}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}
