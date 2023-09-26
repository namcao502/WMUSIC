import Image from "next/image";
import Link from "next/link";

export interface ISystemPlaylistCardProps {
    id: string;
    name: string;
    imgFilePath: string;
    songs: string[];
    clickMenuSystemPlaylist: (id: string, option: string) => void;
}

export default function SystemPlaylistCard(props: ISystemPlaylistCardProps) {
    function clickMenuSystemPlaylist(id: string, option: string) {
        props.clickMenuSystemPlaylist(id, option);
    }

    return (
        <div className="card card-compact w-auto glass">
            <figure>
                <Link
                    href={{
                        pathname: "/list",
                        query: { songs: JSON.stringify(props.songs) },
                    }}
                >
                    <Image src={props.imgFilePath} width={500} height={500} alt="" />
                </Link>
            </figure>
            <div className="card-body w-auto">
                <h5 className="flex align-middle">
                    {props.name}
                    <div className="dropdown dropdown-hover">
                        <label tabIndex={0} className="btn btn-ghost btn-xs">
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
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-auto"
                        >
                            <li>
                                <a onClick={() => clickMenuSystemPlaylist(props.id, "Add")}>Add</a>
                            </li>
                        </ul>
                    </div>
                </h5>
            </div>
        </div>
    );
}
