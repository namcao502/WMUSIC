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
                <h5 className="card-title">
                    {props.name}
                    <div className="dropdown dropdown-hover">
                        <label tabIndex={0} className="btn btn-ghost">
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
                                <circle cx="12" cy="12" r="1"></circle>
                                <circle cx="12" cy="5" r="1"></circle>
                                <circle cx="12" cy="19" r="1"></circle>
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box"
                        >
                            <li>
                                <a onClick={() => clickMenuPlaylist(props.id, "Rename")}>Rename</a>
                            </li>
                            <li>
                                <a onClick={() => clickMenuPlaylist(props.id, "Delete")}>Delete</a>
                            </li>
                        </ul>
                    </div>
                </h5>
            </div>
        </div>
    );
}
