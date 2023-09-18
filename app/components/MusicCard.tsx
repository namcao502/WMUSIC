import Image from "next/image";

export interface IMusicCardProps {
    id: string;
    name: string;
    imgFilePath: string;
    artist: string;
}

export default function MusicCard(props: IMusicCardProps) {
    function handleClick() {
        console.log("clicked");
    }
    return (
        <div className="card card-compact w-72 bg-base-100 shadow-xl" onClick={handleClick}>
            <figure>
                <Image src={props.imgFilePath} width={288} height={288} alt="" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{props.name}</h2>
                <p>{props.artist}</p>
            </div>
        </div>
    );
}
