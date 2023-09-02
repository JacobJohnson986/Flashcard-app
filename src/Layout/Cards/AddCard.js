import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import FormComponent from "../FormComponent";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function AddCards() {
  const history = useHistory();
  const initialFormState = {
    front: "",
    back: "",
  };

  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState({ ...initialFormState });

  useEffect(() => {
    async function fetchDeck() {
      try {
        const fetchedDeck = await readDeck(deckId);
        setDeck(fetchedDeck);
        setCards(fetchedDeck.cards);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDeck();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newCard = {
      ...card,
      deckId: deckId,
    };
    console.log("New Card Data:", newCard); // Log the new card data before the API call
  
    try {
      const createdCard = await createCard(deckId, newCard);
      console.log("Created Card:", createdCard); // Log the response from the server
      setCards([...cards, createdCard]);
      setCard({ ...initialFormState });
    } catch (error) {
      console.error("Error creating card:", error);
    }
  };
  

  const doneHandler = () => {
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <nav>
        <Link to="/">Home</Link> / {deck.name} / Add Card
      </nav>
      <h3>
        <span>{deck.name}</span> : <span>Add Card </span>
      </h3>
      <FormComponent
        card={card}
        handleChange={handleChange}
        handleSubmit={submitHandler}
        buttonText="Save"
      />
      <button type="button" className="btn btn-secondary" onClick={doneHandler}>
        Done
      </button>
    </div>
  );
}

export default AddCards;
