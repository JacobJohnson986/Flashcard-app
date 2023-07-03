import React from "react";
import Deck from "./Deck";

function DeckList({decks}) {
  const deckList = decks.map((deck) => <Deck key={deck.id} deck={deck}/>)

  return (
    <div>
      {deckList}
    </div>
  );
}

export default DeckList;