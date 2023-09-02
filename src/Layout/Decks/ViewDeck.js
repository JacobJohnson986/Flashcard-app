import React, { useEffect, useState } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { deleteDeck, readDeck } from "../../utils/api";
import CardList from "../Cards/CardList";

function ViewDeck() {
    const [cards, setCards] =useState([]);
    const [deck, setDeck] = useState([]);
    const {deckId} = useParams();
    const {url} = useRouteMatch();


    useEffect (() => {
        const abortController = new AbortController();
        async function fetchDeck() {
            const fetchedDeck = await readDeck(deckId, abortController.signal);
            setDeck(fetchedDeck);
            setCards(fetchedDeck.cards)
        }
        fetchDeck();
        return() => abortController.abort();
    }, [deckId]);

    const deleteHandler = async() => {
        const deleteConfirm = window.confirm("Delete this deck? \n You will not be able to recover it.");
        if(deleteConfirm) {
            await deleteDeck(deckId);
        }
    }
    
    return (
        <div>
            <nav><Link to="/">Home</Link> / {deck.name} </nav>
            <div>
                <h3>{deck.name}</h3>
                <p>{deck.description}</p>
                <Link to={`${url}/edit`}><button className="btn btn-secondary">Edit</button></Link>
                <Link to={`${url}/study`}><button className="btn btn-dark">Study</button></Link>
                <Link to={`${url}/cards/new`}><button className="btn btn-primary">Add Cards</button></Link>
                <button onClick={deleteHandler} className="btn btn-danger">Delete</button>
            </div>
            <div>
                <h2>Cards</h2>
                <CardList cards={cards} />
            </div>
        </div>
    )
}

export default ViewDeck;