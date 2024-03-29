import logo from "../assets/memory_game_logo.jfif";
import "../css/header.css";
export default function Header({ points, round, maxPoints }) {
    return (
        <>
            <header>
                <div className="logo">Memory <span>Game</span></div>
                <div className="score">
                    <div className="score-current">
                        <p>Current Points</p>
                        <p>{points}</p>
                    </div>
                    <div className="score-highest">
                        <p>Max Points</p>
                        <p>{maxPoints}</p>
                    </div>
                    <div>
                        <p>Round No</p>
                        <p>{round}</p>
                    </div>
                </div>
            </header>
        </>
    );
}
