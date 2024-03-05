import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateDeck, thunkFetchDeckById, thunkUpdateDeck } from "../../../redux/deck";

import './DeckFormPage.css'
import { useNavigate, useParams } from "react-router-dom";

export function DeckFormPage({ formtype }) {
  const { deckId } = useParams()

  const cardById = useSelector(state => state.cards)
  const deckById = useSelector(state => state.decks)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [format, setFormat] = useState("")
  const [cards, setCards] = useState("")

  const [errors] = useState({});

  useEffect(() => {
    if (formtype == 'update') {
      dispatch(thunkFetchDeckById(deckId))
    }
  }, [formtype, deckId, dispatch])


  useEffect(() => {
    const deck = deckById[deckId];
    if(!deck) return;

    setName(deck.name)
    setFormat(deck.format)

    const cardsList = []
    for (const deckCard of deck.cards) {
      const cardId = deckCard.cardId
      const card = cardById[cardId]
      if(card)
        cardsList.push(`${deckCard.count}x ${card.name}`)
    }
    setCards(cardsList.join('\n'))
  }, [deckId, deckById, cardById, setName, setFormat, setCards])


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const deckFormData = new FormData()
    deckFormData.append('name', name)
    deckFormData.append('format', format)
    deckFormData.append('cards', cards)

    if (formtype == 'update') {
      dispatch(thunkUpdateDeck(deckId, deckFormData)).then(() => navigate('/decks'))
    } else {
      dispatch(thunkCreateDeck(deckFormData)).then(() => navigate('/decks'))
    }
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
            className="deck-form-decklist-textarea"
            rows='6'
            name="cards"
            value={cards}
            placeholder="4x Birds of Paradise
4x Lightning Bolt
3x Watchwolf
2x Dark Ritual
1x Ancestral Recall"
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
