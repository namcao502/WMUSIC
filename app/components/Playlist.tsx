import PlaylistCard from "./PlaylistCard";

export interface IPlaylistProps {
    playlists: { id: number; name: string; numberOfSong: number }[];
    clickAPlaylist: (id: number, option: string) => void;
}

export default function Playlist(props: IPlaylistProps) {
    return (
        <div>
            <div className="grid grid-cols-6 gap-2 m-4 w-auto">
                {props.playlists.map((playlist) => {
                    return (
                        <PlaylistCard
                            key={playlist["id"]}
                            id={playlist["id"]}
                            name={playlist["name"]}
                            numberOfSong={0}
                            clickMenuPlaylist={props.clickAPlaylist}
                        />
                    );
                })}
            </div>
        </div>
    );
}
