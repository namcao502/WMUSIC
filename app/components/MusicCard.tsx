import Image from "next/image";

export interface IMusicCardProps {
    id: string;
    name: string;
    imgFilePath: string;
    filePath: string;
    artist: string;
}

export default function MusicCard(props: IMusicCardProps) {
    function handleClick(filePath: string) {}
    return (
        <div className="card card-compact w-48 glass" onClick={() => handleClick(props.filePath)}>
            <figure>
                <Image src={props.imgFilePath} width={500} height={500} alt="" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{props.name}</h2>
                <p>{props.artist}</p>
            </div>
        </div>
    );
}
