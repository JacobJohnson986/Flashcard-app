import React from "react";
import { Link } from "react-router-dom";
import { deleteDeck } from "../../utils/api";
import { useHistory } from "react-router-dom";

function Deck({deck}) {
  const history = useHistory();

  const handleDelete = async(deckId) => {
        const result = window.confirm("Are you sure you want to delete this deck?");
        if(result){
          deleteDeck(deckId).then(history.go("/"))
        }
       
    }


  return (
    <div className="card">
      <div className="card-body" >
        <h5 className="card-title">{deck.name}</h5>
        <p className="card-subtitle mb-2 text-muted">{deck.cards.length} cards</p>
        <p className="card-text">
          {deck.description}
        </p>
        <Link to={`/decks/${deck.id}`}><button type="button" className="btn btn-secondary">View</button></Link>
        <Link to={`/decks/${deck.id}/study`}><button type="button" className="btn btn-primary">Study</button></Link>
        <button type="button" className="btn btn-delete" onClick={() => handleDelete(deck.id)}>Delete</button>
      </div>
    </div>
  );
}

export default Deck;