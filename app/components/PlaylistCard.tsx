export interface IPlaylistCardProps {
    id: number;
    name: string;
    numberOfSong: number;
    clickMenuPlaylist: (id: number, option: string) => void;
}

export default function PlaylistCard(props: IPlaylistCardProps) {
    function clickMenuPlaylist(id: number, option: string) {
        props.clickMenuPlaylist(id, option);
    }

    return (
        <div className="card card-compact w-48 glass">
            <figure>
                <img src={"slide_5.jpg"} alt="" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{props.name}</h2>
            </div>
        </div>
    );
}
