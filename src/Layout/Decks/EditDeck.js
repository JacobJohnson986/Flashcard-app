import React, { useEffect, useState } from "react";
import { readDeck, updateDeck } from "../../utils/api";
import { useParams, Link } from "react-router-dom";

function EditDeck() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({name: "", description: ""});

    useEffect(() => {
        async function fetchDeck() {
            try{
                const fetchedDeck = await readDeck(deckId);
                setDeck(fetchedDeck);
            } catch (error) {
                console.error(error);
            }
        } fetchDeck()

    },[deckId])

    const changeHandler = ({target}) => {
        setDeck({
            ...deck,
            [target.name]: target.value,
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        await updateDeck(deck);
    }

    return (
        <div>
            <nav>
                <Link to="/">Home</Link> / {deck.name} / Edit Deck
            </nav>
            <h2>Edit Deck</h2>
            <form>
                <div>
                    <label>Name</label>
                    <input
                    id="name"
                    name="name"
                    value={deck.name}
                    onChange={changeHandler}
                    ></input>
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                    id="description"
                    name="description"
                    value={deck.description}
                    onChange={changeHandler}
                    >
                    </textarea>
                </div>
            </form>
            <Link to={`/decks/${deckId}`}><button className="btn btn-danger">Cancel</button></Link>
            <button  onClick={submitHandler} className="btn btn-primary">Submit</button>
        </div>
    )
}

export default EditDeck;