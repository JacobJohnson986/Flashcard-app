import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import { Link } from "react-router-dom";
import FormComponent from "../FormComponent";


function AddCards() {
    const initialFormState = {
        front: "",
        back: "",
    };

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
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        await createCard(deckId, card);
        setCard(initialFormState);
        };
            
    return (
        <div>
            <nav>
                <Link to="/">Home</Link> / {deck.name} / Add Card
            </nav>
        <h3><span>{deck.name}</span> : <span>Add Card </span></h3>
            <FormComponent
                card={card}
                handleChange={handleChange}
                handleSubmit={submitHandler}
                buttonText="Save"
            />
                <Link to={`/decks/${deckId}`}><button type="button" className="btn btn-primary">Done</button></Link>
        </div>
    );
}

export default AddCards;