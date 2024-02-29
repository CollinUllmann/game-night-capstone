import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkFetchAllDecks } from "../../../redux/deck";
import { DeckTile } from "../DeckTile/DeckTile";

export function DecksIndex() {
  const dispatch = useDispatch()

  const decksObj = useSelector(state => state.decks)
  const decks = Object.values(decksObj)
  console.log('decks: ', decks)
  
  useEffect(() => {
    dispatch(thunkFetchAllDecks())
  }, [dispatch])

  return (
    <div className="decks-index-div">
      <h1>Decks</h1>
      <div className="deck-index-tile-div">
        {decks.map(deck => <DeckTile deck={deck} key={deck?.id} />)}
      </div>

    </div>
  )
}