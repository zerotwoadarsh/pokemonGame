import Card from "./Card";
import { useState } from "react";
import { useEffect } from "react";
import "../css/body.css";
import backgroundImg from "../assets/pokemon-background.jpg";
import { shuffle } from "../utils/helper/shuffle";
import GameOver from "./GameOver";

export default function Body({ points, setPoints, setMaxPoints, setRound }) {
    const [pokemonList, setPokemonList] = useState([]);
    const limit = 30;
    const [offset, setOffset] = useState(0);
    const [displayBack, setDisplayBack] = useState(false);
    const [noOfCardsShown, setNoOfCardsShown] = useState(3);
    const [totalNoOfCards, setTotalNoOfCards] = useState(5);
    const [showList, setShowList] = useState([]);
    const [alreadySelected, setAlreadySelected] = useState([]);
    const [game, setGame] = useState("ongoing");

    console.log("render");

    function reset() {
        setMaxPoints((pre) => (pre > points ? pre : points));
        setPoints(0);
        setGame("ongoing");
        setOffset(0);
        setAlreadySelected([]);
    }

    function handleCardClick(e) {
        if (alreadySelected.includes(e)) {
            setGame("over");
        } else {
            setPoints((prev) => prev + 1);
            alreadySelected.push(e);
            //next round
            if (alreadySelected.length == totalNoOfCards) {
                setRound((prev) => prev + 1);
                setAlreadySelected([]);
                setTotalNoOfCards((pre) => pre + 2);
                setNoOfCardsShown((pre) => (pre < 5 ? pre + 1 : 5));
                setOffset((pre) => pre + limit);
            } else {
                //check if cards that are being show are all already selected
                let suffledArray = [];
                let okay = [];
                while (okay.length == 0) {
                    console.log("reshuffling....");
                    suffledArray = shuffle(pokemonList);
                    let toBeShownCards = suffledArray.slice(0, noOfCardsShown);
                    okay = toBeShownCards.filter(
                        (card) => !alreadySelected.includes(card.name)
                    );
                }
                setShowList(suffledArray.slice(0, noOfCardsShown));

                console.log(okay);
                console.log("suffled", suffledArray);
                console.log("pokemonlist", pokemonList);
                console.log("selected", alreadySelected);
                console.log("toshow", showList);
            }
        }
        const cards = document.querySelectorAll(".card");
        cards.forEach((card) => {
            card.classList.add("rotate");
        });
        setDisplayBack(true);
        setTimeout(() => {
            cards.forEach((card) => {
                card.classList.remove("rotate");
            });
            setDisplayBack(false);
        }, 1500);
        console.log("clicked");
    }

    useEffect(() => {
        setShowList(pokemonList.slice(0, noOfCardsShown));
    }, [pokemonList, noOfCardsShown]);

    useEffect(() => {
        console.log("useeffect called to fetch");
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
                );
                const data = await response.json();
                let pokemonUrls = data.results.map((result) => result.url);
                pokemonUrls = shuffle(pokemonUrls).slice(0, totalNoOfCards);
                const pokemonDetails = await Promise.all(
                    pokemonUrls.map(async (url) => {
                        const res = await fetch(url);
                        return res.json();
                    })
                );

                const updatedPokemonList = pokemonDetails.map((pokemon) => ({
                    name: pokemon.name,
                    img: pokemon.sprites.other.showdown.front_default,
                }));

                setPokemonList(updatedPokemonList);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [offset, totalNoOfCards, game]);

    return (
        <>
            {game == "ongoing" ? (
                <div>
                    <div className="status">
                        {alreadySelected.length}
                        <span>/</span>
                        {totalNoOfCards}
                    </div>
                    <div className="card-list">
                        {pokemonList.length == 0 ? (
                            <p className="loading">Loading...</p>
                        ) : (
                            showList.map((pokemon) => (
                                <Card
                                    key={pokemon.name}
                                    name={displayBack ? "" : pokemon.name}
                                    img={
                                        displayBack
                                            ? backgroundImg
                                            : pokemon.img
                                    }
                                    handleCardClick={handleCardClick}
                                />
                            ))
                        )}
                    </div>
                </div>
            ) : (
                <GameOver onClick={reset} />
            )}
        </>
    );
}
