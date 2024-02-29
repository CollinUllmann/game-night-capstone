
// import { useSelector } from "react-redux";

import './DeckTile.css'


export function AddDeckTile() {

  // const deckObj = useSelector(state => state.decks[deck?.id])
  // console.log('deckObj: ', deckObj)

  return (
    <div className="deck-tile-div add">
      <p className="add-deck-tile-plus">+</p>
    </div>
  )
}