import React, { useEffect, useState } from "react";
import { readDeck } from "../../utils/api";
import { useParams, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import StudyCard from "../Cards/StudyCard";

function StudyDeck() {

    const {deckId } = useParams();
    const [cards, setCards] = useState([])
    const [deck, setDeck] = useState([]);
    const [numberOfCards, setnumberOfCards ] = useState (0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [cardPositon, setCardPosition] = useState(1);
    const [card, setCard] = useState(0);
    const history = useHistory();
    

    useEffect(() => {
       // Fetch cards for the deck from the API
       async function fetchDeck() {
       try { const fetchedDeck = await readDeck(deckId);
        setDeck(fetchedDeck);
        setCards(fetchedDeck.cards);
        setnumberOfCards(fetchedDeck.cards.length);
        setCard(fetchedDeck.cards[0])
        } catch (error) {
            console.log(error);
        }
    }
        fetchDeck();
    }, [deckId])

    const flipHandler = () => {
        setIsFlipped(!isFlipped);
    }

    const nextCardHandler = () => {
        setIsFlipped(!isFlipped);
        console.log(cardPositon);
        if (cardPositon !== numberOfCards) {
            setCardPosition(cardPositon + 1)
            setCard(cards[cardPositon])
        } else {
            const restartDeck = window.confirm("Restart cards? \n Click 'cancel' to return to the home page");
            if (!restartDeck) {
                history.push("/")
            } else {
                setCardPosition(1);
                setCard(cards[0])
            }
        }
    }

    return (
        <div>
            <nav>
                <Link to="/">Home</Link> / {deck.name} / Study
            </nav>
        <h2><span> Study </span>: <span>{deck.name}</span></h2>
            <div>
                {numberOfCards <= 2 ? (
                    <div>
                        <h5>Not enough cards.</h5>
                        <p>You need at least 3 cards to study. There are {numberOfCards} cards in this deck.</p>
                        <Link to={`/decks/${deckId}/cards/new`}><button >Add Cards</button></Link>
                    </div>
                ) : (
                <StudyCard card={card} isFlipped={isFlipped} flipHandler={flipHandler} nextCardHandler={nextCardHandler} cardPositon={cardPositon} numberOfCards={numberOfCards}/>
                )}
            </div>
        </div>
    )
}

export default StudyDeck;