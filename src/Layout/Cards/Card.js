import React from "react";
import { deleteCard } from "../../utils/api";
import { Link, useRouteMatch } from "react-router-dom";

function Card({card , id}) {
    console.log(card);
    const {url} = useRouteMatch();

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Delete this card? \n You will not be able to recover it.");
        if (confirmDelete) {
            await deleteCard(id)
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col">
                    <p>{card.front}</p>
                </div>
                <div className="col">
                    <p>{card.back}</p>
                </div>
            </div>
           <Link to={`${url}/cards/${id}/edit`}><button>Edit</button></Link>
           <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default Card;