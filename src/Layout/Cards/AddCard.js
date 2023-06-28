import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import { Link } from "react-router-dom";


function AddCards() {
    const initialFormState = {
        front: "",
        back: ""
    }

    const {deckId} = useParams();
    const [deck, setDeck] = useState([]);
    const [card, setCard] = useState({...initialFormState});

    useEffect(() => {
        async function fetchDeck() {
            try{
                const fetchedDeck = await readDeck(deckId);
                setDeck(fetchedDeck);
            } catch (error) {
                console.error(error);
            }
        }fetchDeck();
    }, [deckId])

    const handleChange = ({target}) => {
        setCard({
            ...card,
            [target.name]: target.value,
            deckId,
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        await createCard(deckId, card);
        setCard(initialFormState);
        }
            
    return (
        <div>
            <nav>
                <Link to="/">Home</Link> / {deck.name} / Add Card
            </nav>
        <h3><span>{deck.name}</span> : <span>Add Card </span></h3>
            <form>
                <div>
                    <label>Front</label>
                    <textarea
                    id="front"
                    name="front"
                    placeholder="Front side of card"
                    value={card.front}
                    onChange={handleChange}
                    ></textarea>
                </div>
                <div>
                    <label>Back</label>
                    <textarea
                    id="back"
                    name="back"
                    placeholder="Back side of card"
                    value={card.back}
                    onChange={handleChange}
                    ></textarea>
                </div>
                <Link to={`/decks/${deckId}`}><button>Done</button></Link>
                <button onClick={submitHandler}>Save</button>
            </form>
        </div>
    )
}

export default AddCards;