import "../css/gameover.css"
import sad_pikachu from"../assets/sad_pikachu.jpg"
export default function GameOver({onClick}) {
    return <div className="game-over-screen">
        <div className="game-over-img-wrapper">
            <img src={sad_pikachu} alt="" />
        </div>
        <button className="restart-btn scale-animation" onClick={onClick}>Restart</button>
    </div>;
}
