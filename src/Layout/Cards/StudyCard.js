import React from "react";

function StudyCard({card, isFlipped, flipHandler, nextCardHandler , cardPositon, numberOfCards}) {
    return (
        <div>
            <h5>Card {cardPositon} of {numberOfCards} </h5>
            <p>
            {isFlipped ? card.back : card.front}
            </p>
            <button onClick={flipHandler} type="button" className="btn btn-secondary">Flip</button>
            {isFlipped && <button onClick={nextCardHandler} type="button" className="btn btn-primary">Next</button>}
        </div>
    )
}

export default StudyCard;