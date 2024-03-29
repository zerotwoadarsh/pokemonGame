import "../css/appscreen.css";
import happy_pikachu from "../assets/happy_pikachu.jpg"
export default function AppScreen({ setShowAppScreen }) {
    return (
        <>
            <div className="app-screen">
                <p className="welcome">
                    Welcome To <span>Memory <span>Game</span></span>
                </p>
                <div className="app-screen-image-wrapper"><img src={happy_pikachu} alt="" /></div>
                <div>
                    <p className="instruction">How To Play?</p>
                    <p>Just Don&apos;t click on the same card twice!</p>
                </div>
                <button className="start-btn scale-animation" onClick={()=>setShowAppScreen(false)}>start</button>
            </div>
        </>
    );
}
