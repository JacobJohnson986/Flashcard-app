import React, { useEffect, useState } from "react";
import { listDecks } from "./../utils/api"
import { Link } from "react-router-dom"
import DeckList from "./Decks/DeckList";

function Home() {
    const [decks, setDecks] = useState([]);

    useEffect(() => {
        async function fetchDecks(){
            try {const response = await listDecks();
            setDecks(response);
                } catch (error) {
                  console.error(error);
                }
        }
        fetchDecks();
    }, [])

    return (
        <div className="create-deck-section">
        <h2>Welcome to Flashcard App!</h2>
      <p>Choose a deck to study or create a new deck.</p>
            <Link to="/decks/new" ><button type="button" className="btn btn-secondary">+ Create Deck</button></Link>
            <DeckList decks={decks} />
        </div>
    )
}

export default Home;