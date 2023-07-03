import React, { useState } from "react";
import { deleteCard } from "../../utils/api";
import { Link, useRouteMatch } from "react-router-dom";

function Card({card , id, updateCards }) {
    console.log(card);
    const {url} = useRouteMatch();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Delete this card? \n You will not be able to recover it."
            );
        if (confirmDelete) {
            setIsDeleting(true);
            await deleteCard(id);
            setIsDeleting(false);
            updateCards();
        };
    };

    return (
        <div className={`card mb-3 ${isDeleting ? "d-none" : ""}`}>
            <div className="row">
                <div className="col">
                    <p>{card.front}</p>
                </div>
                <div className="col">
                    <p>{card.back}</p>
                </div>
            </div>
           <Link to={`${url}/cards/${id}/edit`}><button className="btn btn-primary mr-2">Edit</button></Link>
           <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default Card;