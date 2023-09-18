import Image from "next/image";
import { Howl, Howler } from "howler";

export interface IMusicCardProps {
    id: string;
    name: string;
    imgFilePath: string;
    filePath: string;
    artist: string;
}

export default function MusicCard(props: IMusicCardProps) {
    var sound = new Howl({
        src: [""],
        html5: true,
    });

    function handleClick(filePath: string) {
        // var audio = new Howl({
        //     src: [props.filePath],
        //     loop: true,
        //     volume: 0.5,
        //     onend: function () {
        //         console.log("Finished!");
        //     },
        // });
        // if (audio.playing()) {
        //     audio.stop();
        // }
        // audio.play();

        if (sound.playing()) {
            sound.stop();
        }

        sound = new Howl({
            src: [filePath],
            html5: true,
        });

        sound.play();
    }
    return (
        <div
            className="card card-compact w-48 bg-base-100 shadow-xl glass"
            onClick={() => handleClick(props.filePath)}
        >
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
