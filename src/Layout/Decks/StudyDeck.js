import React, { useEffect, useState } from "react";
import { readDeck, createCard } from "../../utils/api";
import { useParams, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import StudyCard from "../Cards/StudyCard";
import FormComponent from "../FormComponent";

function StudyDeck() {
  const { deckId } = useParams();
  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState({});
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const history = useHistory();

  useEffect(() => {
    async function fetchDeck() {
      try {
        const fetchedDeck = await readDeck(deckId);
        setDeck(fetchedDeck);
        setCards(fetchedDeck.cards);
      } catch (error) {
        console.log(error);
      }
    }
    fetchDeck();
  }, [deckId]);

  const flipHandler = () => {
    setIsFlipped(!isFlipped);
  };

  const nextCardHandler = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex < cards.length) {
        return newIndex;
      } else {
        const restartDeck = window.confirm(
          "Restart cards? Click 'cancel' to return to the home page."
        );
        if (!restartDeck) {
          history.push("/");
          return prevIndex;
        } else {
          return 0;
        }
      }
    });
  };

  const currentCard = cards[currentCardIndex];

  const addCardHandler = async () => {
    const newCard = await createCard(deckId, { front: "", back: "" });
    setCards([...cards, newCard]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCards((prevCards) =>
      prevCards.map((card, index) =>
        index === currentCardIndex ? { ...card, [name]: value } : card
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="study-card">
      <nav>
        <Link to="/">Home</Link> / {deck.name} / Study
      </nav>
      <h2>
        <span>Study</span> : <span>{deck.name}</span>
      </h2>
      {cards.length < 3 ? (
        <div>
          <h5>Not enough cards.</h5>
          <p>
            You need at least 3 cards to study. There are {cards.length} cards
            in this deck.
          </p>
          <Link to={`/decks/${deckId}/cards/new`}>
            <button>Add Cards</button>
          </Link>
        </div>
      ) : (
        <React.Fragment>
          <StudyCard
            card={currentCard}
            isFlipped={isFlipped}
            flipHandler={flipHandler}
            nextCardHandler={nextCardHandler}
            cardPosition={currentCardIndex + 1}
            numberOfCards={cards.length}
          />
          <FormComponent
            card={currentCard}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            buttonText="Save"
          />
        </React.Fragment>
      )}
      <button  onClick={addCardHandler} type="button" className="btn btn-primary">Add Card</button>
    </div>
  );
}

export default StudyDeck;
