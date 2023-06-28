import React from "react";

function StudyCard({card, isFlipped, flipHandler, nextCardHandler , cardPositon, numberOfCards}) {
    return (
        <div>
            <h5>Card {cardPositon} of {numberOfCards} </h5>
            <p>
            {isFlipped ? card.back : card.front}
            </p>
            <button onClick={flipHandler}>Flip</button>
            {isFlipped && <button onClick={nextCardHandler}>Next</button>}
        </div>
    )
}

export default StudyCard;