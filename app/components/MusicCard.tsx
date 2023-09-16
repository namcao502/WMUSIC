export interface IMusicCardProps {}

export default function MusicCard(props: IMusicCardProps) {
    function handleClick() {
        console.log("clicked");
    }
    return (
        <div className="card card-compact w-64 bg-base-100 shadow-xl m-4" onClick={handleClick}>
            <figure>
                <img src="welcome_bg.jpg" alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Title</h2>
                <p>Artists</p>
            </div>
        </div>
    );
}
