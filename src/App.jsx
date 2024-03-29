import { useEffect, useState } from "react";
import Body from "./components/Body";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import AppScreen from "./components/AppScreen";

function App() {
    const [points, setPoints] = useState(0);
    const [round, setRound] = useState(1);
    const [maxPoints, setMaxPoints] = useState(0);
    const [showAppScreen, setShowAppScreen] = useState(true);
    return (
        <>
            <Header {...{ points, round, maxPoints }} />
            {showAppScreen ? (
                <AppScreen setShowAppScreen={setShowAppScreen}/>
            ) : (
                <Body
                    points={points}
                    setPoints={setPoints}
                    setMaxPoints={setMaxPoints}
                    setRound={setRound}
                />
            )}
            <Footer />
        </>
    );
}

export default App;
