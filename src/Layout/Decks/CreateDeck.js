import React, { useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";


function CreateDeck() {
    const history = useHistory();
    const initialFormState = {
        name: "",
        description: "",
    };

    const [formData, setFormData ] = useState({...initialFormState});

    const handleChange = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newDeck = await createDeck(formData);
        history.push(`/decks/${newDeck.id}`)
    }

    return (
        <div>
            <nav>
                <Link to="/">Home</Link> / Create Deck
            </nav>
            <h2>Create Deck</h2>
            <form>
                <div>
                    <label htmlFor="name" className="formName">Name</label>
                        <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        />
                </div>
                <div>
                    <label>Description</label>
                    <textarea 
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    />
                </div>
            </form>
            <Link to="/"><button>Cancel</button></Link>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default CreateDeck;