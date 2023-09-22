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
        <div className="card w-48 bg-base-100 shadow-xl image-full">
            <figure>
                <img src="slide_5.jpg" alt="" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {props.name} ({props.numberOfSong})
                </h2>
                <div className="card-actions justify-end">
                    <div className="dropdown dropdown-hover">
                        <label tabIndex={0} className="btn m-1">
                            O
                        </label>
                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
                        >
                            <li>
                                <button
                                    className="btn"
                                    onClick={() => clickMenuPlaylist(props.id, "Rename")}
                                >
                                    Rename
                                </button>
                            </li>
                            <li>
                                <button
                                    className="btn"
                                    onClick={() => clickMenuPlaylist(props.id, "Delete")}
                                >
                                    Delete
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
