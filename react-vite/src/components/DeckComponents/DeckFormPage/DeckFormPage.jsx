import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkCreateDeck } from "../../../redux/deck";

import './DeckFormPage.css'
import { useNavigate } from "react-router-dom";

export function DeckFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [format, setFormat] = useState("")
  const [cards, setCards] = useState("")

  const [errors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const deckFormData = new FormData()
    deckFormData.append('name', name)
    deckFormData.append('format', format)
    deckFormData.append('cards', cards)
    dispatch(thunkCreateDeck(deckFormData)).then(() => navigate('/decks'))
  };

  return (
    <>
      <div className="deck-form-container">
        <h1>Deck Form</h1>        
      
      <form className="deck-form-div" onSubmit={handleSubmit}>
        <label className="deck-form-input">
          Name
          <input
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {errors.name && <p>{errors.name}</p>}

        <label className="deck-form-input">
          Format
          <select
            name="format"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            required
          >
            <option value="">(Pick One)</option>
            <option value="Commander">Commander</option>
            <option value="Modern">Modern</option>
            <option value="Legacy">Legacy</option>
          </select>
        </label>
        {errors.format && <p>{errors.format}</p>}

        <label className="deck-form-input">
          Deck
          <textarea
            rows='6'
            name="cards"
            value={cards}
            onChange={(e) => setCards(e.target.value)}
            required
          />
        </label>
        {errors.format && <p>{errors.format}</p>}


        <div className="deck-form-submit-button-div">
          <button className='deck-form-modal-button'
            onClick={() => {handleSubmit}}>Submit</button>
        </div>
      </form>
      </div>
    </>
  );
}
