import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkFetchAllDecks } from "../../../redux/deck";
import { DeckTile } from "../DeckTile/DeckTile";
import { AddDeckTile } from "../DeckTile/AddDeckTile";
import { useNavigate } from "react-router-dom";

import './DecksIndex.css'
import { DecklistPanel } from "../DecklistPanel/DecklistPanel";

export function DecksIndex() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const decksObj = useSelector(state => state.decks)
  const decks = Object.values(decksObj)

  const [selectedDeckId, setSelectedDeckId] = useState(null)

  useEffect(() => {
    dispatch(thunkFetchAllDecks())
  }, [dispatch])

  return (
    <div className="decks-index-div">
      <h1>Decks</h1>
      <div className="deck-index-tile-div">
        {decks.map(deck => <DeckTile onClick={() => setSelectedDeckId(deck.id)} deck={deck} key={deck.id} />)}
        <div className="add-deck-button-div" onClick={() => navigate('/decks/new')}>
          <AddDeckTile />
        </div>
      </div>
      <DecklistPanel deckId={selectedDeckId} />

    </div>
  )
}