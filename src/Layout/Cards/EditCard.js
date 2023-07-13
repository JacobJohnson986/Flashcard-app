import React, { useEffect, useState } from "react";
import { readCard, readDeck, updateCard } from "../../utils/api";
import { useParams, Link, useHistory } from "react-router-dom";
import FormComponent from "../FormComponent";

function EditCard() {
    const { deckId, cardId } = useParams();
    const [deck, setDeck] = useState([]);
    const [card, setCard] = useState({});
    const history = useHistory();

    useEffect(() => {
        async function fetchDeck() {
            try {const fetchedDeck = await readDeck(deckId);
            setDeck(fetchedDeck);
            } catch (error) {
                console.error(error);
            }
        }
        async function fetchCards() {
            try {
                const fetchedCards = await readCard(cardId);
                setCard(fetchedCards);
            } catch (error) {
                console.error(error);
            }
        }
        fetchDeck();
        fetchCards();
    }, [deckId, cardId])

    const changeHandler = ({target}) => {
        setCard({
            ...card,
        [target.name]: target.value,
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("Submitting card:", card);
        console.log("Before updateCard:", card);
        await updateCard(card);
        console.log("After updateCard:", card);
        history.push(`/decks/${deckId}`);
      };

    return (
        <div>
            <nav>
                <Link to="/">Home</Link> / {deck.name} / Edit Card {cardId}
            </nav>
            <h2>Edit Card</h2>
            <FormComponent
                card={card}
                handleChange={changeHandler}
                handleSubmit={submitHandler}
                buttonText="Submit"
            />
            <Link to={`/decks/${deckId}`}><button type="cancel" className="btn btn-danger">Cancel</button></Link>
        </div>
    )
}

export default EditCard;