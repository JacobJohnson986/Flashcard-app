import React from "react";

const FormComponent = ({ card, handleChange, handleSubmit, buttonText }) => {
    return (
        <form onSumbit={handleSubmit}>
            <div>
                <label htmlFor="front">Front</label>
                <textarea
                    id="front"
                    name="front"
                    value={card.front}
                    onChange={handleChange}
                ></textarea>
            </div>
            <div>
                <label htmlFor="back">Back</label>
                <textarea
                    id="back"
                    name="back"
                    value={card.back}
                    onChange={handleChange}
                ></textarea>
            </div>
            <button type="submit">{buttonText}</button>
        </form>
    );
};

export default FormComponent;