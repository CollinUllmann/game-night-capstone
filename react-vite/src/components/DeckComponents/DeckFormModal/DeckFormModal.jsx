import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateDeck, thunkFetchDeckById, thunkUpdateDeck } from "../../../redux/deck";

import './DeckFormModal.css'
import { useNavigate } from "react-router-dom";
import { thunkFetchAllCards } from "../../../redux/card";

import { useModal } from "../../../context/Modal";

export function DeckFormModal({ formtype, deckId }) {
  // const { deckId } = useParams()

  const cardById = useSelector(state => state.cards)
  const deckById = useSelector(state => state.decks)

  const cardsAll = Object.values(cardById);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [format, setFormat] = useState("")
  const [cards, setCards] = useState("")

  const [errors, setErrors] = useState({});

  const { closeModal } = useModal();

  useEffect(() => {
    dispatch(thunkFetchAllCards())
    if (formtype == 'update' && deckId) {
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

  function getDeckListErrors() {
    return cards.split('\n')
      .map((line, index) => ({ line: line.trim(), lineNumber: index+1 }))
      .filter(lineAndNumber => lineAndNumber.line)
      .map(lineAndNumber => {
        const error = `Error Line ${lineAndNumber.lineNumber} - ${lineAndNumber.line}`
        const countName = lineAndNumber.line.split('x ')
        if (countName.length != 2) return error;

        const count = Number(countName[0]);
        if(isNaN(count) || count != Math.floor(count) || count <= 0) return error;

        const cardName = countName[1];
        if(!cardsAll.some(card => card.name === cardName)) return error;

        return null;
      }).filter(error => error).join('\n');
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorsNew = { ...errors, deckList: getDeckListErrors() }
    setErrors(errorsNew);

    if(errorsNew.name || errorsNew.format || errorsNew.deckList) return;
    
    const deckFormData = new FormData()
    deckFormData.append('name', name)
    deckFormData.append('format', format)
    deckFormData.append('cards', cards)

    if (formtype == 'update') {
      dispatch(thunkUpdateDeck(deckId, deckFormData)).then(() => navigate(`/decks/${deckId}`)).then(() => closeModal())
    } else {
      dispatch(thunkCreateDeck(deckFormData)).then(returnDeck => navigate(`/users/${returnDeck.userId}`)).then(() => closeModal())
    }

  };

  const handleDemo = () => {
    const cardsAll = Object.values(cardById);
    const sampleCard = () => {
      const index = Math.floor(Math.random() * cardsAll.length);
      const card = cardsAll.splice(index, 1)[0];
      return card;
    }

    const cardsDeck = [];
    for(let i = 0; i < 100; i++) {
      const card = sampleCard();
      if(!card) break;

      cardsDeck.push(card);
    }

    const deckListString = cardsDeck.map(card => `1x ${card.name}`).join('\n');
    setCards(deckListString);
  }

  let key = 0;
  return (
    <>
      <div className="deck-form-container">
        <h1>Deck Form</h1>        
      
      <form className="deck-form" onSubmit={handleSubmit}>
        <label className="deck-form-input">
          <span className="deck-form-input-label-span">Name</span>
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
          <span className="deck-form-input-label-span">Format</span>
          <select
            name="format"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            required
          >
            <option value="">(Select One)</option>
            <option value="Commander">Commander</option>
            <option value="Modern">Modern</option>
            <option value="Legacy">Legacy</option>
          </select>
        </label>
        {errors.format && <p>{errors.format}</p>}

        <label className="deck-form-input">
          <span className="deck-form-input-label-span">Deck</span>
          <textarea
            className="deck-form-decklist-textarea"
            rows='15'
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
        <div className="deck-form-errors-div">
          {errors.deckList && errors.deckList.split('\n').map(errorLine => <div className="validation-error" key={key++}>{errorLine}</div>)}
        </div>
        <div className="deck-form-submit-button-div">
          <button className='standard deck-form-modal-button' onClick={() => {handleSubmit}}>Submit</button>
          <button className="standard deck-form-modal-button" onClick={closeModal}>Cancel</button>
          <button className="standard" type="button" onClick={handleDemo} style={{ backgroundColor: '#000', color: '#ccc', border: '1px solid #ccc', outline: 'none' }}>Demo</button>
        </div>
      </form>
      </div>
    </>
  );
}
